import { branchServices } from '@services/branchServices';
import { useQuery } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
    const [selectedBranch, setSelectedBranch] = useState('');
    const { data: branches = [] } = useQuery({
        queryKey: ['branches'],
        queryFn: branchServices.getAllBranches,
    });

    const branchOptions = branches.map((branch) => ({
        label: branch.name,
        value: branch.id,
    }));

    useEffect(() => {
        if (branches.length > 0 && !selectedBranch) {
            setSelectedBranch(branches[0].id);
        }
    }, [branches, selectedBranch]);

    return (
        <BranchContext.Provider value={{ branches, branchOptions, selectedBranch, setSelectedBranch }}>
            {children}
        </BranchContext.Provider>
    );
};
