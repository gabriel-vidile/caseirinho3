import { Flex, Heading } from '@chakra-ui/react';
import { Comida } from '../../components/Comida';
import { client } from '../../utils/Client';

export default function Cardapio({ foods }) {
  return (
    <Flex flexDir="column" justifyContent="center" padding={10}>
      <Heading as="h2" color="yellow.500" padding={5} fontWeight="semibold">
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
