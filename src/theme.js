import { extendTheme } from '@mui/material';

export const theme = extendTheme({
    colorSchemeSelector: 'class',
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#ff7300',
                    light: '#ffa04d',
                    dark: '#f56e00',
                    bgcolor: '#f6a4311a',
                    contrastText: '#ffffff',
                },
                common: {
                    main: '#333333',         // màu đen nhẹ (nội dung chính)
                    light: '#f5f5f5',        // nền nhạt (hover/disabled)
                    dark: '#000000',         // đen đậm (có thể dùng cho border hoặc text nổi bật)
                    contrastText: '#ffffff', // chữ trên nền đậm (ví dụ nút đen)
                },
                background: {
                    default: '#fafafa',
                    paper: '#ffffff',
                    hover: '#f4f4f4',
                    active: '#edf4fb',
                    contrast: '#111827',
                },
                blue: {
                    main: '#1976d2',
                    light: '#42a5f5',
                    dark: '#1565c0',
                    bgcolor: '#E3F2FD',
                    contrastText: '#ffffff'
                },
                text: {
                    primary: '#000000',
                    secondary: '#888888',
                    tertiary: '#78350f',
                },
                error: {
                    main: '#f44336',
                    light: '#ff7961',
                    dark: '#e53935',
                    bgcolor: '#FFE6E6',
                    contrastText: '#fff',
                },
                success: {
                    main: '#16a34a',
                    light: '#22c55e',
                    dark: '#257e2b',
                    bgcolor: '#dcfce7',
                    contrastText: '#fff',
                },
                warning: {
                    main: '#ed6c02',
                    light: '#ff9800',
                    dark: '#e65100',
                    bgcolor: '#fff7eb',
                    contrastText: '#fff',
                },
                info: {
                    main: '#0288d1',
                    light: '#03a9f4',
                    dark: '#01579b',
                    bgcolor: '#E3F2FD',
                    contrastText: '#fff',
                }
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#90caf9',
                },
                background: {
                    default: '#10151e',
                    paper: '#161A23',
                    hover: '#1e2229',
                    active: '#1e2a39',
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#aaaaaa',
                },
                success: {
                    main: '#4caf50',
                    light: '#22c55e',
                    dark: '#1b5e20',
                    bgcolor: '#1e2e26',
                    contrastText: '#fff',
                },
                warning: {
                    main: '#ed6c02',
                    light: '#ff9800',
                    dark: '#e65100',
                    bgcolor: '#332b1a',
                    contrastText: '#fff',
                },
                info: {
                    main: '#0288d1',
                    light: '#03a9f4',
                    dark: '#01579b',
                    bgcolor: '#1a2b36',
                    contrastText: '#fff',
                },
                error: {
                    main: '#f44336',
                    light: '#e57373',
                    dark: '#b71c1c',
                    bgcolor: '#3a1f1f',
                    contrastText: '#fff',
                },
            },
        },
    },
});

export const getTheme = (mode = 'light') => ({
    palette: {
        ...theme.palette,
        mode,
    },
})

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
