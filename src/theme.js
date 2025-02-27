import { extendTheme } from '@mui/material';

// Tùy chỉnh theme với extendTheme
export const theme = extendTheme({
    colorSchemeSelector: 'class',
    typography: {
        // fontSize: 13,
        lineHeight: 1.2,
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#1976d2',
                },
                background: {
                    default: '#f4f4f4',
                    paper: '#ffffff',
                    hover: '#f4f4f4',
                    active: '#edf4fb',
                },
                text: {
                    primary: '#000000',
                    secondary: '#888888',
                },
                blue: {
                    main: '#1e88e5',
                    light: '#6ab7ff',
                    dark: '#005cb2',
                    contrastText: '#ffffff',
                },
                pink: {
                    main: '#d81b60',
                    light: '#ff5c8d',
                    dark: '#bb0047',
                    contrastText: '#ffffff',
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
                blue: {
                    main: '#1e88e5',
                    light: '#6ab7ff',
                    dark: '#005cb2',
                    contrastText: '#ffffff',
                },
                pink: {
                    main: '#d81b60',
                    light: '#ff5c8d',
                    dark: '#bb0047',
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
