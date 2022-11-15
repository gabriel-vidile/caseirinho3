import Head from 'next/head';
import { client } from '../utils/Client';
import { Flex, Heading } from '@chakra-ui/react';
import { Comida } from '../components/Comida';
import { Banner } from '../components/Banner';

export default function Home({ comidas }) {
  return (
    <div>
      <Head>
        <title>Caseirinho</title>
        <meta name="description" content="Pedidos e comidas deliciosas" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <Banner />
        <Flex mt={3} color="yellow.500" justifyContent="center">
          <Heading>Novidades do dia</Heading>
        </Flex>
        <Flex
          flexDir={['column', 'row']}
          alignItems="center"
          justifyContent="center"
        >
          {comidas
            ?.filter((item, idx) => idx < 3 && item.isCardapio === true)
            .map((produto) => (
              <Comida key={produto._id} comida={produto} />
            ))}
        </Flex>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "food"]';
  const comidas = await client.fetch(query);

  return {
    props: { comidas },
  };
};
