import Provider from './provider';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <>
      <Provider />
      <Toaster position="bottom-center" />
    </>
  );
}
