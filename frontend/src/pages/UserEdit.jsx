import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Box, Button, Container, TextField, Typography, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from '@mui/material';
import Copyright from '../components/Copyright';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function UserEdit() {  
    const { state } = useLocation();
    const userId = state;
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [permission, setPermission] = useState();

    const handleSubmit = (event) => {
        const userToken = localStorage.getItem('token');

        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const editUser = {
            isAdmin: data.get('isAdmin')
        };

        axios.patch(`${process.env.REACT_APP_API_URL}/user/${userId}`, editUser, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
        }).then((res) => {
            Swal.fire({
                title: 'Colaborador editado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Entendi'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/colaborators');
                }
            });
        }).catch(function (error) {
            Swal.fire({
                title: 'Houve um erro na edição',
                icon: 'error',
                confirmButtonText: 'Entendi'
            });
        });
    };

    const getUser = async () => {
        const userToken = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
        });

        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setCpf(response.data.user.cpf);
        setCellphone(response.data.user.cellphone);
        setPermission(response.data.user.isAdmin);
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Box>
            <Navbar />
            {/* Main */}
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, width: 56, height: 56, bgcolor: 'primary.main' }}>
                        <AccountCircleIcon sx={{ width: 40, height: 40 }} />
                    </Avatar>
                    <Typography component="h4" variant="h4">
                        Editar Permissão
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            disabled
                            id="name"
                            label="Nome"
                            name="name"
                            value={name}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            disabled
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            disabled
                            id="cpf"
                            label="CPF"
                            name="cpf"
                            value={cpf}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            disabled
                            id="cellphone"
                            label="Celular"
                            name="cellphone"
                            value={cellphone}
                        />
                        { permission !== undefined ?
                        <FormControl sx={{ mt: 1 }}>
                            <FormLabel>Permissão</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="radio-button"
                                name="isAdmin"
                                defaultValue={permission}
                            >
                                <FormControlLabel value="false" control={<Radio />} label="Usuário comum" />
                                <FormControlLabel value="true" control={<Radio />} label="Usuário Administrador" />
                            </RadioGroup>
                        </FormControl>
                        : <></>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ py: 1.9, mt: 3, mb: 2 }}
                            size="large"
                        >
                            Atualizar Permissão
                        </Button>
                    </Box>
                </Box>
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

export default UserEdit;