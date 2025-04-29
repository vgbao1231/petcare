
import { CartContext } from '@src/contexts/CartContext';
import { useContext } from 'react';

export function useCart() {
    return useContext(CartContext);
}
