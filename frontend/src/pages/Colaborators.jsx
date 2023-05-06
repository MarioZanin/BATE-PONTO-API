import { Button, Box, Grid, Container, TextField, Typography, InputAdornment } from '@mui/material';
import Copyright from '../components/Copyright';
import Navbar from '../components/Navbar';
import Table from '../components/UsersTable';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import ReportButton from '../components/ReportButton';

function Colaborators() { 
    const [user, setUser] = useState([]);

    return (
        <Box>
            <Navbar />
            {/* Main */}
            <Container maxWidth="md" component="main" sx={{ pt: 10 }}>
                <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Meus Colaboradores
                </Typography>
                {/* header */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    mt: 3,
                                    mb: 5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="search"
                                    name="search"
                                    label="Buscar colaborador"
                                    placeholder="Exemplo: Luiz Guilherme"
                                    onChange={(e) => setUser(e.target.value)}
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon></SearchIcon>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row-reverse',
                                    mt: 5,
                                    mb: 5
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{ ml: 2, py: 1 }}
                                    color="success"
                                    href="/register"
                                >
                                    <PersonAddAltIcon />&nbsp;Novo&nbsp;Colaborador
                                </Button>
                                <ReportButton />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                {/* mobile */}
                <Box sx={{ display: { md: 'none' } }}>
                    <Box
                        sx={{
                            mt: 3,
                            mb: 3,
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{ ml: 2, py: 1 }}
                            color="success"
                            href="/register"
                        >
                            <PersonAddAltIcon />&nbsp;Novo&nbsp;Colaborador
                        </Button>
                        <ReportButton />
                    </Box>
                    <Box
                        sx={{
                            mt: 3,
                            mb: 3,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            id="search"
                            name="search"
                            label="Buscar colaborador"
                            placeholder="Exemplo: Luiz Guilherme"
                            onChange={(e) => setUser(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon></SearchIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Box>
                {/* Table */}
                <Table userName={user} />
                {/* Footer */}
                <Container
                    maxWidth="md"
                    component="footer"
                    sx={{
                        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                        mt: 8,
                        py: [3, 6],
                    }}
                >
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </Container>
        </Box>
    );
}

export default Colaborators;