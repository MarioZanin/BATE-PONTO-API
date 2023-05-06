import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Avatar, Box, Button, Container, TextField, Typography, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from '@mui/material';
import Copyright from '../components/Copyright';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import InputMask from "react-input-mask";
import PeopleIcon from '@mui/icons-material/People';

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [cpfError, setCpfError] = useState(false);
    const [cellphoneError, setCellphoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const handleSubmit = (event) => {
        const userToken = localStorage.getItem('token');

        event.preventDefault();
        const data = new FormData(event.currentTarget);

        name === '' ? setNameError(true) : setNameError(false);
        email === '' ? setEmailError(true) : setEmailError(false);
        cpf === '' ? setCpfError(true) : setCpfError(false);
        cellphone === '' ? setCellphoneError(true) : setCellphoneError(false);
        password.length < 6 || password === '' ? setPasswordError(true) : setPasswordError(false);
        confirmPassword !== password || confirmPassword === '' ? setConfirmPasswordError(true) : setConfirmPasswordError(false);

        const newUser = {
            name: name,
            email: email,
            cpf: cpf,
            cellphone: cellphone,
            password: password,
            confirmPassword: confirmPassword,
            isAdmin: data.get('isAdmin')
        };

        if (name === '' || email === '' || cpf === '' || cellphone === '' || password === '' || confirmPassword === '') {
            Swal.fire({
                title: 'Campos em Branco',
                text: 'Você não pode deixar nenhum dos campos em branco.',
                icon: 'error',
                confirmButtonText: 'Entendi'
            });
        } else if (password.length < 6) {
            Swal.fire({
                title: 'Senha inválida',
                text: 'A nova senha precisa de ter mais de 6 caracteres',
                icon: 'error',
                confirmButtonText: 'Entendi'
            });
        } else if (password !== confirmPassword) {
            Swal.fire({
                title: 'Senhas não coincidem',
                text: 'As senhas informadas não são iguais.',
                icon: 'error',
                confirmButtonText: 'Entendi'
            });
        } else {
            axios.post(`${process.env.REACT_APP_API_URL}/user/employee`, newUser, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                },
            }).then((res) => {
                Swal.fire({
                    title: 'Colaborador adicionado com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Entendi'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/colaborators');
                    }
                });
            }).catch(function (error) {
                Swal.fire({
                    title: 'Houve um erro no cadastro',
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
                    <Avatar sx={{ m: 1, width: 56, height: 56, bgcolor: 'primary.main' }}>
                        <PersonAddAltIcon sx={{ width: 40, height: 40 }} />
                    </Avatar>
                    <Typography component="h4" variant="h4">
                        Novo Colaborador
                    </Typography>
                    {/* Massive insert Desktop */}
                    <Box
                        sx={{
                            ml: 22.5,
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        <Button
                            sx={{ mt: 2 }}
                            variant="contained"
                            color="success"
                            href="/register/massive"
                        >
                            <PeopleIcon /> &nbsp; Inserção em massa
                        </Button>
                    </Box>
                    {/* Massive insert Mobile */}
                    <Button
                        sx={{ mt: 2, display: { md: 'none' }}}
                        variant="contained"
                        color="success"
                        href="/register/massive"
                        fullWidth
                    >
                        <PeopleIcon /> &nbsp; Inserção em massa
                    </Button>

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
                        />
                        <InputMask
                            mask="999.999.999-99"
                            disabled={false}
                            alwaysShowMask={false}
                            onChange={(e) => setCpf(e.target.value)}
                        >
                            {() =>
                                <TextField
                                    error={cpfError}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="cpf"
                                    label="CPF"
                                    name="cpf"
                                />
                            }
                        </InputMask>
                        <InputMask
                            mask="(99) 9999-99999"
                            disabled={false}
                            alwaysShowMask={false}
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
                        <TextField
                            error={confirmPasswordError}
                            margin="normal"
                            required
                            fullWidth
                            id="confirmPassword"
                            label="Confirmar Senha"
                            name="confirmPassword"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <FormControl sx={{ mt: 1 }}>
                            <FormLabel>Permissão</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="radio-button"
                                name="isAdmin"
                                defaultValue="false"
                            >
                                <FormControlLabel value="false" control={<Radio />} label="Usuário comum" />
                                <FormControlLabel value="true" control={<Radio />} label="Usuário Administrador" />
                            </RadioGroup>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ py: 1.9, mt: 3, mb: 2 }}
                            size="large"
                        >
                            Adicionar Colaborador
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

export default Register;