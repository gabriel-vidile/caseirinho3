import { Flex, Heading, Text } from '@chakra-ui/react';
import Comida from '../../components/comida';
import { client } from '../../utils/Client';
export default function ComidaDetalhes({ food }) {
  const { image, name, details, price, acompanhamentos } = food;

  return (
    <Flex
      flexDir={['column', 'row']}
      alignItems={['center', 'flex-start']}
      justifyContent="center"
    >
      <Comida comida={food} />
      <Flex flexDir="column" mt={5} padding={5}>
        <Heading>Detalhes</Heading>
        <Text>{details}</Text>
      </Flex>
    </Flex>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type == "food"] {
    slug {
      current
    }
  }
  `;

  const foods = await client.fetch(query);

  const paths = foods.map((food) => ({
    params: {
      slug: food.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "food" && slug.current == '${slug}'][0]`;

  const food = await client.fetch(query);

  return {
    props: { food },
  };
};
