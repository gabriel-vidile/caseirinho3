import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
import { Footer } from '../components/Footer';
import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <ChakraProvider>
        <Toaster />
        <Navbar />
        <Component {...pageProps} />;
        <Footer />
      </ChakraProvider>
    </StateContext>
  );
}

export default MyApp;
