import { Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Copyright from '../components/Copyright';
import Navbar from '../components/Navbar';

function Dashboard() {
    const userToken = localStorage.getItem('token');

    let actualTime = new Date().toLocaleTimeString();

    const [time, setTime] = useState(actualTime);

    const UpdateTime = () => {
        actualTime = new Date().toLocaleTimeString();
        setTime(actualTime);
    };

    setInterval(UpdateTime, 1000);

    const appointment = () => {
        const timeStart = {
            start: new Date()
        };

        axios.post(`${process.env.REACT_APP_API_URL}/appointment`, timeStart, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
        }).then((res) => {
            Swal.fire({
                title: 'Ponto batido com sucesso!',
                text: 'Você receberá um email como forma de registro.',
                icon: 'success',
                confirmButtonText: 'Entendi'
            });
        }).catch(function (error) {
            Swal.fire({
                title: 'Algo deu errado... :(',
                icon: 'error',
                confirmButtonText: 'Entendi'
            });
        });
    }

    return (
        <Box>
            <Navbar/>
            {/* Main */}
            <Container maxWidth="sm" component="main" sx={{ pt: 10, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Hora atual
                </Typography>
                <Typography variant="h2" align="center" color="text.secondary" component="p">
                    {time}
                </Typography>
                <Container align="center">
                    <Button href="#" variant="contained" size="large" sx={{ py: 3, pl: 10, px: 10, my: 4, mx: 1.5 }}
                        onClick={() => {
                            appointment()
                        }}
                    >
                        Bater Ponto
                    </Button>
                </Container>
            </Container>
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
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </Box>
    );
}

export default Dashboard;