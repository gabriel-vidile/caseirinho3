import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [itensDoCarrinho, setItensDoCarrinho] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [quantidadeDeItens, setQuantidadeDeItens] = useState(1);
  const [quantidadeDeItensTotal, setQuantidadeDeItensTotal] = useState(0);

  let foundProduct;
  let produtoAtual;

  const aumentarQuantidadeDeItens = () => {
    setQuantidadeDeItens(
      (antigoQuantidadeDeItens) => antigoQuantidadeDeItens + 1
    );
  };
  const diminuirQuantidadeDeItens = () => {
    setQuantidadeDeItens((antigoQuantidadeDeItens) => {
      if (antigoQuantidadeDeItens - 1 < 1) {
        return 1;
      }
      return antigoQuantidadeDeItens - 1;
    });
  };

  const aoAdicionar = (produto) => {
    produtoAtual = {
      id: produto.id,
      nome: produto.name,
      quantidade: produto.quantidade,
      preco: produto.price,
      details: produto.details,
      image: produto.image[0],
    };

    const verificarSeOProdutoEstaNoCarrinho = itensDoCarrinho.find(
      (item) => item.id === produtoAtual.id
    );
    setPrecoTotal(
      (precoAnterior) =>
        precoAnterior + produtoAtual.preco * produtoAtual.quantidade
    );

    setQuantidadeDeItensTotal(
      (quantidadeAnterior) => quantidadeAnterior + produtoAtual.quantidade
    );

    if (verificarSeOProdutoEstaNoCarrinho) {
      const atualizarItensDoCarrinho = itensDoCarrinho.map(
        (produtoDoCarrinho) => {
          if (produtoDoCarrinho.id === produtoAtual.id) {
            return {
              ...produtoDoCarrinho,
              quantidade:
                produtoDoCarrinho.quantidade + produtoAtual.quantidade,
            };
          } else {
            return {
              ...produtoDoCarrinho,
            };
          }
        }
      );
      setItensDoCarrinho(atualizarItensDoCarrinho);
    } else {
      produtoAtual.quantidade = produtoAtual.quantidade;
      setItensDoCarrinho([...itensDoCarrinho, { ...produtoAtual }]);
    }
    toast.success(
      `${produtoAtual.quantidade} ${produto.name}  adicionado ao carrinho`
    );
  };

  const aoRemover = (product) => {
    produtoAtual = { ...product };
    foundProduct = itensDoCarrinho.find(
      (item) =>
        item.id === produtoAtual.id && produtoAtual.tamanho === item.tamanho
    );
    const novosItensDoCarrinho = itensDoCarrinho.filter(
      (item) => item !== foundProduct
    );
    setPrecoTotal(
      (precoAnterior) =>
        precoAnterior - foundProduct.preco * foundProduct.quantidade
    );

    setQuantidadeDeItensTotal(
      (quantidadeAnterior) => quantidadeAnterior - foundProduct.quantidade
    );

    setItensDoCarrinho(novosItensDoCarrinho);
  };

  const mudarQuantidadeDeItensDoCarrinho = (product, valor) => {
    produtoAtual = { ...product };

    foundProduct = itensDoCarrinho.find(
      (item) =>
        item.id === produtoAtual.id && item.tamanho === produtoAtual.tamanho
    );

    const novosItensDoCarrinho = itensDoCarrinho.filter(
      (item) => item !== foundProduct
    );
    if (valor === 'inc') {
      setItensDoCarrinho([
        ...novosItensDoCarrinho,
        {
          ...foundProduct,
          quantidade: foundProduct.quantidade + 1,
        },
      ]);
      setPrecoTotal((precoAnterior) => precoAnterior + foundProduct.preco);

      setQuantidadeDeItensTotal((quantidadeAnterior) => quantidadeAnterior + 1);
    } else if (valor === 'dec') {
      if (foundProduct.quantidade > 1) {
        setItensDoCarrinho([
          ...novosItensDoCarrinho,
          {
            ...foundProduct,
            quantidade: foundProduct.quantidade - 1,
          },
        ]);
        setPrecoTotal((precoAnterior) => precoAnterior - foundProduct.preco);
        setQuantidadeDeItensTotal(
          (quantidadeAnterior) => quantidadeAnterior - 1
        );
      }
    }
  };

  return (
    <Context.Provider
      value={{
        mostrarCarrinho,
        setMostrarCarrinho,
        itensDoCarrinho,
        precoTotal,
        quantidadeDeItens,
        quantidadeDeItensTotal,
        aumentarQuantidadeDeItens,
        diminuirQuantidadeDeItens,
        aoAdicionar,
        aoRemover,
        mudarQuantidadeDeItensDoCarrinho,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
