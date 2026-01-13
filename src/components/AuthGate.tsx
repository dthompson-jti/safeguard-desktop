import { useAtomValue } from 'jotai';
import { sessionAtom } from '../data/atoms';
import { LoginView } from '../features/Session/LoginView';

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
    const session = useAtomValue(sessionAtom);

    if (!session.isAuthenticated) {
        return <LoginView />;
    }

    return <>{children}</>;
};
