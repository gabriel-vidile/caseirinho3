import { Flex, Image } from '@chakra-ui/react';
import classes from './banner.module.css';
export default function Banner() {
  return (
    <Flex>
      <Image
        className={classes.image}
        alt="imagem com fundo preto e uma chamada para ação do restaurante caseirinho, falando sobre a qualidade da comida e dos preços"
        src="./assets/images/CaseirinhoBanner.png"
      ></Image>
    </Flex>
  );
}
