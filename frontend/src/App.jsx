import Routes from './routes';

import { ThemeProvider } from '@emotion/react';
import { Theme } from './themes';

function App() {
  return (
    <ThemeProvider theme={ Theme }>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
