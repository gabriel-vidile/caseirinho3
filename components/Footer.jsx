import { Flex, Image, Heading } from "@chakra-ui/react";
import classes from './footer.module.css'
import Iframe from 'react-iframe'

export const Footer = () =>{
    return(
    <footer>
        <Flex flexDir="column">
          <Heading color='yellow.500' padding={6} alignSelf="center">
            Nosso salão
          </Heading>

          <Flex className={classes.nossaCasa}>
            <Iframe width="100%" position="relative" className={classes.img} url="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=Rua%20honduras,%20324%20+(Caseirinho)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" />
            
            <Flex className={classes.__endereco} padding={5}>
              Rua honduras, 324 Jardim Meriti - São João de Meriti
            </Flex>
          </Flex>
        </Flex>
      </footer>
    )
}