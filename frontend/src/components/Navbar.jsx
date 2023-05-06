import { AppBar, Link, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const isAdmin = (localStorage.getItem('isAdmin') === 'true');

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const Logout = () => {
        localStorage.clear();
        setAnchorElNav(null);
    }

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            {/* Desktop */}
            <Toolbar sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Bate&Ponto
                </Typography>
                {/* Menu */}
                <Link
                    variant="button"
                    color="inherit"
                    href="/"
                    sx={{
                        my: 1, mx: 1.5
                    }}
                    underline="hover"
                >
                    Inicio
                </Link>
                {isAdmin &&
                    <Link
                        variant="button"
                        color="inherit"
                        href="/colaborators"
                        sx={{
                            my: 1, mx: 1.5
                        }}
                        underline="hover"
                    >
                        Colaboradores
                    </Link>
                }
                <Link
                    variant="button"
                    color="inherit"
                    href="/appointments"
                    sx={{
                        my: 1, mx: 1.5
                    }}
                    underline="hover"
                >
                    Apontamentos
                </Link>
                <Link
                    variant="button"
                    color="inherit"
                    href="/profile"
                    sx={{
                        my: 1, mx: 1.5
                    }}
                    underline="hover"
                >
                    Perfil
                </Link>
                <Link
                    variant="button"
                    color="inherit"
                    onClick={Logout}
                    href="/login"
                    sx={{
                        my: 1, mx: 1.5
                    }}
                    underline="hover"
                >
                    Sair
                </Link>
            </Toolbar>

            {/* Mobile */}
            <Toolbar sx={{ display: { md: 'none' } }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Bate&Ponto
                </Typography>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                {/* Menu */}
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    <MenuItem
                        onClick={handleCloseNavMenu}
                        component="a"
                        href='/'
                    >
                        <Typography>Inicio</Typography>
                    </MenuItem>
                    {isAdmin &&
                        <MenuItem
                            onClick={handleCloseNavMenu}
                            component="a"
                            href='/colaborators'
                        >
                            <Typography>Colaboradores</Typography>
                        </MenuItem>
                    }
                    <MenuItem
                        onClick={handleCloseNavMenu}
                        component="a"
                        href='/appointments'
                    >
                        <Typography>Apontamentos</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={handleCloseNavMenu}
                        component="a"
                        href='/profile'
                    >
                        <Typography>Perfil</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={Logout}
                        component="a"
                        href='/login'
                    >
                        <Typography>Sair</Typography>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>

    );
}

export default Navbar;