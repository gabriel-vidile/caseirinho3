import { Flex, Heading } from '@chakra-ui/react';
import Comida from '../../components/comida';
import { client } from '../../utils/Client';

export default function Cardapio({ foods }) {
  return (
    <Flex flexDir="column" padding={5}>
      <Heading as="h2" color="yellow.600">
        Cardápio do dia
      </Heading>
      <Flex
        flexDir={['column', 'row']}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        {foods?.map((produto) => (
          <Comida key={produto.id} comida={produto} />
        ))}
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "food"]';
  const foods = await client.fetch(query);
  return {
    props: { foods },
  };
};
