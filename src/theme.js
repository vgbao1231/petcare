import { createTheme } from '@mui/material';

export const theme = createTheme({
    colorSchemeSelector: 'class',
    typography: {
        lineHeight: 1.2,
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#ff7300',
                },
                brand: {
                    // Màu chủ đạo của brand
                    main: '#ff7300',
                    light: '#ffa04d',
                    dark: '#e06500',
                    contrastText: '#ffffff',
                },
                background: {
                    default: '#fafafa',
                    paper: '#ffffff',
                    hover: '#f4f4f4',
                    active: '#edf4fb',
                    contrast: '#111827',
                },
                text: {
                    primary: '#000000',
                    secondary: '#888888',
                    tertiary: '#78350f',
                },
                gray: {
                    main: '#dadada',
                    light: '#cfcfcf',
                    dark: '#707070',
                    contrastText: '#ffffff',
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#90caf9',
                },
                background: {
                    default: '#111111',
                    paper: '#161A23',
                    hover: '#2d2f39',
                    active: '#1e2a39',
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#aaaaaa',
                },
                success: {
                    main: '#66bb6a',
                    light: '#81c784',
                    dark: '#388e3c',
                    contrastText: '#ffffff',
                },
                gray: {
                    main: '#444444',
                    light: '#cfcfcf',
                    dark: '#707070',
                    contrastText: '#ffffff',
                },
            },
        },
    },
});

export const centerSx = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export const textEllipsisSx = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};
