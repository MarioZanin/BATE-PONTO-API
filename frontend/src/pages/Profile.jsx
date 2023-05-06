import { Box, Button, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Copyright from '../components/Copyright';
import Navbar from '../components/Navbar';
import InputMask from "react-input-mask";

function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [cellphoneError, setCellphoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem('token');

        const getUser = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                },
            });
            setName(response.data.user.name);
            setEmail(response.data.user.email);
            setCellphone(response.data.user.cellphone);
        }

        return getUser();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const userToken = localStorage.getItem('token');

        name === '' ? setNameError(true) : setNameError(false);
        email === '' ? setEmailError(true) : setEmailError(false);
        cellphone === '' ? setCellphoneError(true) : setCellphoneError(false);
        password.length >= 6 || password === '' ? setPasswordError(false) : setPasswordError(true);

        let userUpdated = {
            name: name,
            email: email,
            cellphone: cellphone,
        }

        if (password !== '') {
            userUpdated['password'] = password;
        }

        if (name === '' || email === '' || cellphone === '') {
            Swal.fire({
                title: 'Campos em Branco',
                text: 'Você não pode deixar os campos (nome, email e telefone) em branco.',
                icon: 'error',
                confirmButtonText: 'Entendi'
            });
        } else if (password !== '' && password.length < 6) {
            Swal.fire({
                title: 'Senha inválida',
                text: 'A nova senha precisa de ter mais de 6 caracteres',
                icon: 'error',
                confirmButtonText: 'Entendi'
            });
        } else {
            axios.patch(`${process.env.REACT_APP_API_URL}/user/profile`, userUpdated, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                },
            }).then((res) => {
                Swal.fire({
                    title: 'Atualizado com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Entendi'
                });
            }).catch(function (error) {
                Swal.fire({
                    title: 'Houve um erro na atualização',
                    icon: 'error',
                    confirmButtonText: 'Entendi'
                });
            });
        }
    };

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
                    <Typography component="h3" variant="h4">
                        Meus dados
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={nameError}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nome"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            autoFocus
                        />
                        <TextField
                            error={emailError}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <InputMask
                            mask="(99) 9999-99999"
                            disabled={false}
                            alwaysShowMask={false}
                            value={cellphone}
                            onChange={(e) => setCellphone(e.target.value)}
                        >
                            {() => 
                            <TextField
                                error={cellphoneError}
                                margin="normal"
                                required
                                fullWidth
                                id="cellphone"
                                label="Celular"
                                name="cellphone"
                            />
                            }
                        </InputMask>
                        <TextField
                            error={passwordError}
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Senha"
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ py: 1.9, mt: 3, mb: 2 }}
                            size="large"
                        >
                            Salvar
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

export default Profile;