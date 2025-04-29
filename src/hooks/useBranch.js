

import { BranchContext } from '@src/contexts/BranchContext';
import { useContext } from 'react';

export function useBranch() {
    return useContext(BranchContext);
}
