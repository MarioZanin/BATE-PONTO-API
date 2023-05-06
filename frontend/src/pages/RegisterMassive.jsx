import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import PeopleIcon from '@mui/icons-material/People';
import MassiveInsertButton from '../components/MassiveInsertButton';
import ExampleMassiveInsertButton from '../components/ExampleMassiveInsertButton';

function RegisterMassive() {
    return (
        <Box>
            <Navbar />
            {/* Main */}
            <Container component="main" maxWidth="md">
                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, width: 56, height: 56, bgcolor: 'primary.main' }}>
                        <PeopleIcon sx={{ width: 40, height: 40 }} />
                    </Avatar>
                    <Typography component="h4" variant="h4">
                        Inserção em massa
                    </Typography>
                    <Typography sx={{ mt: 2 }} component="h4" variant="body1">
                        Aqui você poderá inserir uma massiva quantidade de colaboradores de uma só vez, preencha a planilha seguindo a planilha de exemplo.
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                            <ExampleMassiveInsertButton />
                        </Grid>
                        <Grid item xs={6}>
                            <MassiveInsertButton />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default RegisterMassive;