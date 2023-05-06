import * as React from 'react';
import { Container, Stack, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../components/Navbar';

function CircularColor() {
  return (
    <Box>
      <Navbar />
      <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 10 }}>
          <Box
            sx={{
              mt: 5,
              mb: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CircularProgress color="primary" thickness={4} size={230} />
          </Box>
        </Container>
      </Stack>
    </Box>
  );
}

export default CircularColor;