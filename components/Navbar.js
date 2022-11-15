import {
  Flex,
  Text,
  Button,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import classes from './navbar.module.css';
import { BiBook, BiFoodMenu } from 'react-icons/bi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Cart } from './Cart';
import Logo from './logo';
import { useStateContext } from '../context/StateContext';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mostrarCarrinho, setMostrarCarrinho, quantidadeDeItensTotal } =
    useStateContext();

  return (
    <nav>
      <Flex padding={5} alignItems="center">
        <Flex justifyContent={['center', 'space-around']}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            colorScheme="red"
            color="gold"
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
        <Link href="/">
          <Logo />
        </Link>
        <Flex display={['none', 'flex']}>
          <Link href="/" className={classes.nav}>
            <Flex padding={5}>
              <BiBook />
              <Text ml={2} textDecoration="none" color="red.900">
                Home
              </Text>
            </Flex>
          </Link>
          <Link href="/cardapio" className={classes.nav}>
            <Flex padding={5}>
              <BiFoodMenu />
              <Text ml={2}>Cardapio</Text>
            </Flex>
          </Link>
        </Flex>

        <Flex width={[70]}>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setMostrarCarrinho(true)}
            className={classes.cartIco}
          >
            <AiOutlineShoppingCart color="red" fontSize={50} />
            <span className={classes.cartItemQty}>
              {quantidadeDeItensTotal}
            </span>
          </Button>
        </Flex>
      </Flex>
      <Flex
        display="flex"
        flexDir="row"
        justifyContent="flex-start"
        alignItems="center"
        padding={5}
      >
        {mostrarCarrinho && <Cart />}
      </Flex>
      {isOpen ? (
        <Flex flexDir="column" alignItems="center">
          <Link href="/" className={classes.nav}>
            <Flex padding={5}>
              <BiBook />
              <Text ml={2} textDecoration="none" color="red.900">
                Home
              </Text>
            </Flex>
          </Link>
          <Link href="/cardapio" className={classes.nav}>
            <Flex padding={5}>
              <BiFoodMenu />
              <Text ml={2}>Cardapio</Text>
            </Flex>
          </Link>
        </Flex>
      ) : null}
    </nav>
  );
}
