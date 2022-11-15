import { urlFor } from '../utils/Client';
import { Flex, Text, Image, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
export default function Comida({
  comida: { _id, image, name, slug, price, details, isCardapio },
}) {
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
      <Flex flexDir="column" alignItems="center" key={name}>
        <Link href={`/comida/${slug.current}`}>
          <Flex flexDir="column" mt={5} ml={['0.5', '3']}>
            <Image
              borderRadius={20}
              src={urlFor(image && image[0])}
              width={['150', '250']}
              height={['150', '250']}
              alt={name}
            />

            <Text className="product-name">{name}</Text>
            <Text className="product-price">Preço R${price}</Text>
          </Flex>
        </Link>
        <Button
          colorScheme="red"
          onClick={() => aoAdicionar(food)}
          variant="outline"
        >
          Adicionar ao carrinho
        </Button>
      </Flex>
    );
  } else {
    return <div></div>;
  }
}
