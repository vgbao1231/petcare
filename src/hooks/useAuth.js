import { AuthContext } from '@src/contexts/AuthContext';
import { useContext } from 'react';

export function useAuth() {
    return useContext(AuthContext);
}
