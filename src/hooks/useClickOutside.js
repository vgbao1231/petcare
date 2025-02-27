import { useEffect } from 'react';

function useClickOutside(ref, callback, isActive) {
    useEffect(() => {
        if (isActive) {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) callback();
            };
            const rootElement = document.getElementById('root');
            rootElement.addEventListener('mousedown', handleClickOutside);
            return () => rootElement.removeEventListener('mousedown', handleClickOutside);
        }
    }, [ref, callback, isActive]);
}

export default useClickOutside;
