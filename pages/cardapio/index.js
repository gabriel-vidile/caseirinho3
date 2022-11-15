import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import Comida from '../../components/comida';
import { BsSearch } from 'react-icons/bs';
import { client } from '../../utils/Client';

export default function Cardapio({ foods }) {
  const [pesquisa, setPesquisa] = useState('');
  const [totalProdutos, setTotalProdutos] = useState(foods.length);

  function quantidadeDeProdutos(li) {
    const quantidade = foods.filter((item, i) =>
      item.name.toLowerCase().includes(li.toLowerCase())
    );
    setTotalProdutos(quantidade.length);
    return;
  }

  return (
    <Flex flexDir="column" padding={10}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<BsSearch color="red" />}
        />
        <Input
          value={pesquisa}
          bg="whiteAlpha"
          onChange={(evento) => {
            setPesquisa(evento.target.value);
            quantidadeDeProdutos(evento.target.value);
          }}
          type="tel"
          placeholder="Digite o que busca!"
        />
      </InputGroup>
      <Heading as="h2" color="yellow.600" padding={5}>
        Nossos produtos
      </Heading>
      <Text color="red.600" fontWeight="bolder" padding={5}>
        {totalProdutos == foods.length
          ? 'Total de produtos: ' + foods.length
          : 'Total de produtos correspondentes: ' + totalProdutos}
      </Text>
      <Flex
        flexDir="column"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        {pesquisa === ''
          ? foods?.map((produto) => (
              <Comida key={produto.id} comida={produto} />
            ))
          : foods
              ?.filter((item, idx) =>
                item.name
                  .toLowerCase()
                  .includes(pesquisa.toLowerCase() && item.isCardapio === true)
              )
              .map((produto) => <Comida key={produto.id} comida={produto} />)}
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
