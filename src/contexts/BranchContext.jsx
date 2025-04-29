import { branchServices } from '@services/branchServices';
import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
    const { data: branches = [] } = useQuery({
        queryKey: ['branches'],
        queryFn: branchServices.getAllBranches,
    });

    return <BranchContext.Provider value={{ branches }}>{children}</BranchContext.Provider>;
};
