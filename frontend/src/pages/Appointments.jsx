import { Box, Container, TextField, Typography, Grid } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from 'react';
import Copyright from '../components/Copyright';
import Navbar from '../components/Navbar';
import Table from '../components/AppointmentsTable';
import axios from 'axios';
import moment from 'moment';

function Appointments() {
    const [appointments, setAppointments] = useState([]);

    const [dateStart, setDateStart] = useState(moment());
    const [dateEnd, setDateEnd] = useState(moment());

    const getAppointments = (newDateStart, newDateEnd) => {
        const userToken = localStorage.getItem('token');

        const filter = {
            start: moment(newDateStart),
            end: moment(newDateEnd),
        }

        const getAppointmentsByDate = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/search?start=${filter.start}&end=${filter.end}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                },
            });
            setAppointments(response.data);
        }

        return getAppointmentsByDate();
    }

    useEffect(() => {
        getAppointments();
    }, []);

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
                    Meus Apontamentos
                </Typography>
                {/* Date Pickers */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                mt: 5,
                                mb: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                                <DatePicker
                                    label="Data Início"
                                    value={dateStart}
                                    onChange={(newDateStart) => {
                                        setDateStart(newDateStart);
                                        getAppointments(newDateStart, dateEnd);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                mt: 5,
                                mb: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                                <DatePicker
                                    label="Data Fim"
                                    value={dateEnd}
                                    onChange={(newDateEnd) => {
                                        setDateEnd(newDateEnd);
                                        getAppointments(dateStart, newDateEnd);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Grid>
                </Grid>
                <Table appointments={appointments} />
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

export default Appointments;