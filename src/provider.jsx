import { BrowserRouter } from 'react-router-dom';

import AppRouter from './router';

export default function Provider() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
