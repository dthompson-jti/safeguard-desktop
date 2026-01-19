// src/desktop/components/SupervisorNoteModal.tsx

import { useState, useMemo } from 'react';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import {
    supervisorNoteModalAtom,
    historicalChecksAtom,
    selectedHistoryRowsAtom,
    historicalRefreshAtom,
    historicalRowUpdateAtom,
    activeDetailRecordAtom,
} from '../atoms';
import { SUPERVISOR_NOTE_REASONS, SupervisorNoteReason } from '../types';
import { addToastAtom } from '../../data/toastAtoms';
import { updateHistoricalCheck } from '../../desktop-enhanced/data/mockData';
import { Modal } from '../../components/Modal';
import { Select, SelectItem } from '../../components/Select';
import { Button } from '../../components/Button';
import styles from './SupervisorNoteModal.module.css';

export const SupervisorNoteModal = () => {
    const [modalState, setModalState] = useAtom(supervisorNoteModalAtom);
    const historicalChecks = useAtomValue(historicalChecksAtom);
    const setHistoricalChecks = useSetAtom(historicalChecksAtom);
    const setSelectedRows = useSetAtom(selectedHistoryRowsAtom);
    const setRefreshTrigger = useSetAtom(historicalRefreshAtom);
    const addToast = useSetAtom(addToastAtom);

    const [reason, setReason] = useState<SupervisorNoteReason>('Unit Lockdown');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const setRowUpdate = useSetAtom(historicalRowUpdateAtom);

    // Initial load / Edit mode logic
    const [hasExistingComment, setHasExistingComment] = useState(false);

    // Detect if we are editing an existing comment
    useState(() => {
        // We use a simple effect-like logic in render or useEffect. 
        // Using useEffect to avoid state update loops during render.
        // Actually best to do this when modalState.isOpen changes.
    });

    // Sync state when modal opens
    useMemo(() => {
        if (!modalState.isOpen) return;

        // Find the check(s)
        const selectedChecks = historicalChecks.filter((c: { id: string }) => modalState.selectedIds.includes(c.id));

        // Check if any have a note
        const existingNoteCheck = selectedChecks.find((c: { supervisorNote?: string }) => !!c.supervisorNote);

        if (existingNoteCheck && existingNoteCheck.supervisorNote) {
            setHasExistingComment(true);

            // Try to parse: "Reason - Notes"
            const parts = existingNoteCheck.supervisorNote.split(' - ');
            const potentialReason = parts[0] as SupervisorNoteReason;

            if (SUPERVISOR_NOTE_REASONS.includes(potentialReason)) {
                setReason(potentialReason);
                setAdditionalNotes(parts.slice(1).join(' - '));
            } else {
                setReason('Other');
                setAdditionalNotes(existingNoteCheck.supervisorNote);
            }
        } else {
            setHasExistingComment(false);
            setReason('Unit Lockdown');
            setAdditionalNotes('');
        }
    }, [modalState.isOpen, modalState.selectedIds, historicalChecks]);

    const handleClose = () => {
        if (isSaving) return;
        setModalState({ isOpen: false, selectedIds: [] });
        setReason('Unit Lockdown');
        setAdditionalNotes('');
        setHasExistingComment(false);
    };

    const [activeRecord, setActiveRecord] = useAtom(activeDetailRecordAtom);

    const handleSave = async () => {
        if (isSaving) return;
        setIsSaving(true);

        const note = additionalNotes
            ? `${reason} - ${additionalNotes}`
            : reason;

        const updates = {
            supervisorNote: note,
            supervisorName: 'Dave Thompson', // Mock logged-in user
            reviewDate: new Date().toISOString(),
            reviewStatus: 'verified' as const,
        };

        try {
            await updateHistoricalCheck(modalState.selectedIds, updates);
            setHistoricalChecks((checks) =>
                checks.map((check) =>
                    modalState.selectedIds.includes(check.id) ? { ...check, ...updates } : check
                )
            );

            // Sync active record if it's the one being edited
            // This ensures the Detail Panel updates immediately without requiring a full re-select/refresh
            if (activeRecord && modalState.selectedIds.includes(activeRecord.id)) {
                setActiveRecord({ ...activeRecord, ...updates });
            }

            // Trigger local sticky update for batch
            const batchUpdates = modalState.selectedIds.map(id => ({
                id,
                changes: updates
            }));
            setRowUpdate(batchUpdates);

            if (modalState.selectedIds.length > 1) {
                setSelectedRows(new Set());
            }

            addToast({
                message: `Comment saved for ${modalState.selectedIds.length} check${modalState.selectedIds.length !== 1 ? 's' : ''}`,
                icon: 'check_circle',
                variant: 'success',
            });

            handleClose();
        } catch (error) {
            console.error('Failed to save comment:', error);
            addToast({ message: 'Failed to save comment.', icon: 'error', variant: 'alert' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (isSaving) return;
        setIsSaving(true);

        const updates = {
            supervisorNote: undefined,
            supervisorName: undefined,
            reviewDate: undefined,
            reviewStatus: 'pending' as const,
        };

        try {
            await updateHistoricalCheck(modalState.selectedIds, updates);
            setHistoricalChecks((checks) =>
                checks.map((check) =>
                    modalState.selectedIds.includes(check.id) ? { ...check, ...updates } : check
                )
            );

            // Sync active record if it's the one being edited
            if (activeRecord && modalState.selectedIds.includes(activeRecord.id)) {
                setActiveRecord({ ...activeRecord, ...updates });
            }

            setRefreshTrigger(prev => prev + 1);

            // Always refresh selection state
            if (modalState.selectedIds.length > 1) {
                setSelectedRows(new Set());
            }

            addToast({
                message: 'Comment removed.',
                icon: 'delete',
                variant: 'neutral',
            });

            handleClose();
        } catch (error) {
            console.error('Failed to remove comment:', error);
            addToast({ message: 'Failed to remove comment.', icon: 'error', variant: 'alert' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Modal
            isOpen={modalState.isOpen}
            onClose={handleClose}
            title={hasExistingComment ? "Edit Supervisor Comment" : "Add Supervisor Comment"}
            width="440px"
        >
            <Modal.Header>
                <span className={styles.title}>{hasExistingComment ? "Edit Supervisor Comment" : "Add Supervisor Comment"}</span>
                <Button variant="tertiary" size="s" iconOnly aria-label="Close" onClick={handleClose} disabled={isSaving}>
                    <span className="material-symbols-rounded">close</span>
                </Button>
            </Modal.Header>

            <Modal.Content>
                <div className={styles.body}>
                    <div className={styles.field}>
                        <label className={styles.label}>Reason for missed check(s)</label>
                        <Select
                            value={reason}
                            onValueChange={(val) => setReason(val as SupervisorNoteReason)}
                            placeholder="Select a reason..."
                            disabled={isSaving}
                        >
                            {SUPERVISOR_NOTE_REASONS.map((r) => (
                                <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Additional notes</label>
                        <textarea
                            className={styles.textarea}
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                            placeholder="Enter additional context..."
                            rows={3}
                            disabled={isSaving}
                        />
                    </div>


                </div>
            </Modal.Content>

            <Modal.Footer>
                <div className={styles.footerActions}>
                    {hasExistingComment && (
                        <div style={{ marginRight: 'auto' }}>
                            <Button
                                variant="secondary"
                                size="m"
                                onClick={() => { void handleDelete(); }}
                                disabled={isSaving}
                            >
                                Remove Comment
                            </Button>
                        </div>
                    )}
                    <Button
                        variant="primary"
                        className={styles.saveButton}
                        onClick={() => { void handleSave(); }}
                        size="m"
                        loading={isSaving}
                        disabled={reason === 'Other' && !additionalNotes.trim()}
                    >
                        Save
                    </Button>
                    <Button
                        variant="secondary"
                        className={styles.cancelButton}
                        size="m"
                        onClick={handleClose}
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
