import React, {useRef, useState}from "react";
import Link from "next/link";
import { Button, Flex, Heading, Input, Modal, ModalBody,Image, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, useDisclosure } from "@chakra-ui/react";
import {AiOutlineMinus, AiOutlinePlus, AiOutlineLeft,AiOutlineFire} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../utils/Client";
import {useRouter} from 'next/router'
import classes from './cart.module.css'

export const Cart = () =>{
    const cartRef = useRef();
    const { setMostrarCarrinho, itensDoCarrinho, precoTotal,mudarQuantidadeDeItensDoCarrinho, quantidadeDeItensTotal,aoRemover} = useStateContext()
    const {isOpen,onOpen,onClose} = useDisclosure();    
    const [observacoes,setObservacoes] = useState('')
    const [nome,setNome] = useState('')
    const [pagamento,setPagamento] = useState('')
    const [endereco,setEndereco] = useState('')
    const [precisaTroco, setPrecisaTroco] = useState('')
    const [troco, setTroco] = useState('')
    const router = useRouter()


    function montarMensagem(Itens){
        let texto = '';
        for (var i = 0; i<Itens.length; i++){
            let agora = Itens[i].nome.toString() + ` no valor de ${Itens[i].preco.toString()} cada` +' ----- quantidade de '+ Itens[i].quantidade.toString()  +'\n' ;
            texto += agora;
        }
        return texto;
    }
    function salvarPedido(){

        let pedido = {
            Nome: nome,
            Endereço: endereco,
            Itens: itensDoCarrinho,
            Preco:precoTotal,
            Metodo_de_pagamento: pagamento,
            Precisa_de_troco: troco,
            Observacoes: observacoes

        }

        let montarItens = montarMensagem(itensDoCarrinho)


        let mensagem = `Olá, me chamo ${nome}, meu endereço é *${endereco}* 
            -------- Meus Pedidos ---------
            ${montarItens}

             No valor total de: ${precoTotal}

            *Metódo de Pagamento*: ${pagamento}

             E troco para ${troco}

             Observações: ${observacoes}

        `

        router.push(`https://wa.me/+5521970202037/?text=${encodeURI(mensagem)}`)
    }    
    return(
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <Button
                    variant='ghost'
                    type="button"
                    className="cart-heading"
                    onClick={()=>setMostrarCarrinho(false)}
                >
                    <AiOutlineLeft/>
                    <span className="heading">Seu Carrinho</span>
                    <span className="cart-num-items">{quantidadeDeItensTotal} itens</span>
                </Button>
                {itensDoCarrinho.length<1 && (
                    <Flex flexDir='column' display="flex" alignItems='center' className="empty-cart">
                        <AiOutlineFire size={150}/>
                        <Heading as='h3'>Seu carrinho está vazio</Heading>
                        <Link href='/cardapio'>
                            <Button
                                mt={5}
                                type="button"
                                colorScheme='red'
                                onClick={()=>setMostrarCarrinho(false)}
                            >
                                Continue a Comprar
                            </Button>
                        </Link>
                    </Flex>
                )}
                <Flex display='flex' padding={5} flexDir="column">
                    {itensDoCarrinho.length>=1 && itensDoCarrinho.map((item, index)=>(
                        <Flex alignItems='center' flexDir='row' key={index} >
                            <Image className={classes.img} alt={item.nome} src={urlFor(item?.image)}/>
                            <Flex padding={2}>
                                <Flex flexDir='column'>
                                    <Heading as="h5" color="blackAlpha.700" fontSize={20}>{item.nome}</Heading>
                                    <Heading as="h4" color='blackAlpha.800' fontSize={15}>R${item.preco}</Heading>
                            <Flex >
                            <Flex display="flex" alignItems="center">
                                <Flex
                                    border="solid"
                                    alignItems="center"
                                    borderWidth={3}
                                    padding={3}
                                    borderColor="red.300"
                                    w={100}
                                    justifyContent="space-between"
                                >
                                    <Text
                                    cursor="pointer"
                                    className="minus"
                                    onClick={()=> mudarQuantidadeDeItensDoCarrinho(item,'dec')}
                                    >
                                    <AiOutlineMinus />
                                    </Text>
                                    <Text className="num">{item.quantidade}</Text>
                                    <Text
                                    className="plus"
                                    cursor="pointer"
                                    onClick={()=> mudarQuantidadeDeItensDoCarrinho(item,'inc')}
                                    >
                                    <AiOutlinePlus />
                                    </Text>
                                </Flex>
                                <Button
                                    type="button"
                                    padding={3}
                                    variant="ghost"
                                    margin={3}
                                    className="remove-item"
                                    onClick={()=>aoRemover(item)}
                                >
                                    <TiDeleteOutline/>
                                </Button>
                                </Flex>
                            </Flex>
                                </Flex>
                            </Flex>
                        </Flex> 
                    ))}
                    <Flex>
                        {itensDoCarrinho.length>=1 && ( 
                            <Flex flexDir='column' display="flex" padding={10} alignItems='center'>
                                    <Text>Observações: {observacoes}</Text>
                              
                                <Flex flexDir="row"  alignItems="flex-end" justifyContent="center">
                                    <Heading as="h3" color='blackAlpha.700' fontSize={25}> Subtotal: R$  </Heading>
                                    <Heading as="h3" color="blackAlpha.800" fontSize={25}>{precoTotal}</Heading> 
                                </Flex>
                                <Flex flexDir='row'>
                                    <Button colorScheme='red'  onClick={onOpen}  mt={5} padding={5}>Finalizar Compra</Button>
                                </Flex>
                            
                            </Flex>
                        )}
                    </Flex>
                </Flex>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Finalizar pedido</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                          <Stack>
                                <Text>Nome: </Text>
                                <Input type='text'  placeholder="Nome"  onChange={(evento) => {setNome(evento.target.value)}}/>
                                <Text>Endereço Completo: </Text>
                                <Input type='text'  placeholder='Seu endereço COMPLETO' onChange={(evento) => {setEndereco(evento.target.value)}}/>
                                <Text>Metódo de pagamento</Text>
                                <Select size="md" placeholder="Forma de pagamento" onChange={(evento) => {setPagamento(evento.target.value)}}>
                                    <option value='Cartão de credito'>Cartão de crédito</option>
                                    <option value='Cartão de débito'>Cartão de débito</option>
                                    <option value='Dinheiro'>Dinheiro</option>
                                </Select>
                               
                                {pagamento === 'Dinheiro' ? (
                                <Stack>
                                   <Flex flexDir='row'>
                                     <Text mr={5}>Precisa de troco? Sim</Text>
                                    <input type='checkbox' onChange={(evento) => {setPrecisaTroco(evento.target.value)}} />
                                   </Flex>
                                    {precisaTroco === 'on' ? (<Stack>
                                        <Text>Troco para quanto?</Text>
                                        <Input type='text'  placeholder="Troco para quanto?"  onChange={(evento) => {setTroco(evento.target.value)}}/>
                                    </Stack>) :(<br></br>)}
                                    
                                </Stack>
                                ) : (<br></br>)}
                                 <Text>Observações</Text>
                                <Input type='text' onChange={(evento) => {setObservacoes(evento.target.value)}}/>
                            </Stack>
                        
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='ghost' colorScheme='red' onClick={()=> {salvarPedido()}}>Fechar pedido</Button>
 
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
}