import * as Popover from '@radix-ui/react-popover';
import { useAtom } from 'jotai';
import { desktopEnhancedTreeLayoutAtom } from '../atoms';

import { Switch } from '../../components/Switch';
import styles from './TopNavMenu.module.css';

export const TopNavMenu = () => {
    const [treeLayout, setTreeLayout] = useAtom(desktopEnhancedTreeLayoutAtom);


    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className={styles.hamburgerButton} aria-label="Main menu">
                    <span className="material-symbols-rounded">menu</span>
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content className={styles.popoverContent} align="start" sideOffset={8}>


                    <div className={styles.menuRow}>
                        <div className={styles.menuRowText}>
                            <span className="material-symbols-rounded">format_indent_increase</span>
                            <span>Show indentation lines</span>
                        </div>
                        <Switch
                            checked={treeLayout === 'indented'}
                            onCheckedChange={(checked) => setTreeLayout(checked ? 'indented' : 'full-width')}
                            id="indent-toggle"
                        />
                    </div>


                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
