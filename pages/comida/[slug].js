import { Flex, Heading, Text, Image } from '@chakra-ui/react';
import { client, urlFor } from '../../utils/Client';
export default function ComidaDetalhes({ food, foods }) {
  const { image, name, details, price, acompanhamentos } = food;

  return (
    <Flex flexDir="column" alignItems="center">
      <Heading>{name}</Heading>
      <Image src={urlFor(image && image[0])} />
      <Flex flexDir="column">
        <Text>{details}</Text>
        <Flex>
          {acompanhamentos.map((acompanhamento) => {
            <Flex>
              <Text>{acompanhamento}</Text>
            </Flex>;
          })}
        </Flex>
        <Text>{price}</Text>
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
  const foodsQuery = '*[_type == "food"]';

  const food = await client.fetch(query);
  const foods = await client.fetch(foodsQuery);

  return {
    props: { foods, food },
  };
};
