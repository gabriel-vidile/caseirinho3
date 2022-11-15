import { urlFor } from '../utils/Client';
import { Flex, Text, Image, Button,Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
export const Comida = ({
  comida: { _id, image, name, slug, price, details, isCardapio },
}) => {
  const { aoAdicionar } = useStateContext();

  let food = {
    id: _id,
    image: image,
    name: name,
    price: price,
    details: details,
    quantidade: 1,
    ehCardapio: isCardapio,
  };

  if (isCardapio) {
    return (
      <Flex flexDir="column " padding={4} alignItems="center" key={name}>
        <Link href={`/comida/${slug.current}`}>
          <Flex flexDir="column" mt={5} ml={['0.5', '3']}>
            <Image
              borderRadius={20}
              src={urlFor(image && image[0])}
              width={['150', '250']}
              height={['150', '250']}
              alt={name}
            />

            <Flex flexDir='column' padding={3}>
              <Text className="product-name">{name}</Text>
              <Heading fontSize={24}  fontWeight="semibold" color="yellow.600" className="product-price">Preço R${price}</Heading>
            </Flex>
          </Flex>
        </Link>
        <Button
        mt={4}
        padding={5}
          colorScheme="red"
          color='gold'
          onClick={() => aoAdicionar(food)}
          variant="solid"
        >
          Adicionar ao carrinho
        </Button>
      </Flex>
    );
  } else {
    return <div></div>;
  }
}
