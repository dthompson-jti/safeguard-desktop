// src/desktop/components/SupervisorNoteModal.tsx

import { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import * as Dialog from '@radix-ui/react-dialog';
import {
    supervisorNoteModalAtom,
    historicalChecksAtom,
    selectedHistoryRowsAtom,
    historicalRefreshAtom,
} from '../atoms';
import { SUPERVISOR_NOTE_REASONS, SupervisorNoteReason } from '../types';
import { addToastAtom } from '../../data/toastAtoms';
import { updateHistoricalCheck } from '../../desktop-enhanced/data/mockData';
import { Select, SelectItem } from '../../components/Select';
import { Button } from '../../components/Button';
import styles from './SupervisorNoteModal.module.css';

export const SupervisorNoteModal = () => {
    const [modalState, setModalState] = useAtom(supervisorNoteModalAtom);
    const setHistoricalChecks = useSetAtom(historicalChecksAtom);
    const setSelectedRows = useSetAtom(selectedHistoryRowsAtom);
    const setRefreshTrigger = useSetAtom(historicalRefreshAtom);
    const addToast = useSetAtom(addToastAtom);

    const [reason, setReason] = useState<SupervisorNoteReason>('Unit Lockdown');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleClose = () => {
        if (isSaving) return;
        setModalState({ isOpen: false, selectedIds: [] });
        setReason('Unit Lockdown');
        setAdditionalNotes('');
    };

    const handleSave = async () => {
        if (isSaving) return;
        setIsSaving(true);

        const note = additionalNotes
            ? `${reason} - ${additionalNotes}`
            : reason;

        const updates = {
            supervisorNote: note,
            reviewStatus: 'verified' as const
        };

        try {
            // 1. Update Mock Database (for enhanced view re-fetches)
            await updateHistoricalCheck(modalState.selectedIds, updates);

            // 2. Update historical checks Atom (for immediate local updates in legacy views if any)
            setHistoricalChecks((checks) =>
                checks.map((check) =>
                    modalState.selectedIds.includes(check.id)
                        ? { ...check, ...updates }
                        : check
                )
            );

            // 3. Trigger re-fetch in enhanced views
            setRefreshTrigger(prev => prev + 1);

            // 4. Clear selection
            setSelectedRows(new Set());

            // 5. Show confirmation
            addToast({
                message: `Comment saved for ${modalState.selectedIds.length} check${modalState.selectedIds.length !== 1 ? 's' : ''}`,
                icon: 'check_circle',
                variant: 'success',
            });

            handleClose();
        } catch (error) {
            console.error('Failed to save comment:', error);
            addToast({
                message: 'Failed to save comment.',
                icon: 'error',
                variant: 'alert',
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog.Root open={modalState.isOpen} onOpenChange={(open) => !open && handleClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay} />
                <Dialog.Content className={styles.content} data-platform="desktop">
                    <div className={styles.header}>
                        <Dialog.Title className={styles.title}>Add Supervisor Comment</Dialog.Title>
                        <Dialog.Close asChild>
                            <Button variant="tertiary" size="s" iconOnly aria-label="Close" disabled={isSaving}>
                                <span className="material-symbols-rounded">close</span>
                            </Button>
                        </Dialog.Close>
                    </div>

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
                                    <SelectItem key={r} value={r}>
                                        {r}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>
                                Additional notes {reason !== 'Other' && '(optional)'}
                            </label>
                            <textarea
                                className={styles.textarea}
                                value={additionalNotes}
                                onChange={(e) => setAdditionalNotes(e.target.value)}
                                placeholder="Enter additional context..."
                                rows={3}
                                disabled={isSaving}
                            />
                        </div>

                        <div className={styles.hint}>
                            <span className={`material-symbols-rounded ${styles.hintIcon}`}>info</span>
                            <span>
                                Applying to {modalState.selectedIds.length} selected check
                                {modalState.selectedIds.length !== 1 ? 's' : ''}.
                            </span>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <Button
                            variant="primary"
                            className={`${styles.footerButton} ${styles.saveButton}`}
                            onClick={() => { void handleSave(); }}
                            loading={isSaving}
                            disabled={reason === 'Other' && !additionalNotes.trim()}
                        >
                            Save Comment
                        </Button>
                        <Button
                            variant="secondary"
                            className={`${styles.footerButton} ${styles.cancelButton}`}
                            onClick={handleClose}
                            disabled={isSaving}
                        >
                            Cancel
                        </Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
