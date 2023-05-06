import { Typography } from '@mui/material';

function Copyright(props) {
    return (
        <Typography variant="body1" align="center" {...props}>
            {'Copyright © '} Bate&Ponto{' '} {new Date().getFullYear()}
        </Typography>
    );
}
export default Copyright;