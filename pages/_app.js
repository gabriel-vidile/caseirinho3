import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <ChakraProvider>
        <Toaster
          toastOptions={{
            duration: 2000,
            style: {
              background: '#D10000',
              color: '#FFDE2E',
            },
          }}
        />
        <Navbar />
        <Component {...pageProps} />;
        <Footer />
      </ChakraProvider>
    </StateContext>
  );
}

export default MyApp;
