import { createTheme } from '@mui/material';
import { orange, purple } from '@mui/material/colors';

export const Theme = createTheme({
    palette: {
        primary: {
            main: purple[700],
            dark: purple[800],
            light: purple[500],
            contrastText: '#ffffff',
        },
        secondary: {
            main: orange[700],
            dark: orange[800],
            light: orange[500],
            contrastText: '#ffffff',
        }
    }
});