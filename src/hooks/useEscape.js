import { useEffect } from 'react';

const useEscape = (onEscape, isActive) => {
    useEffect(() => {
        if (isActive) {
            const handleKeyDown = (event) => event.key === 'Escape' && onEscape();
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [onEscape, isActive]);
};

export default useEscape;
