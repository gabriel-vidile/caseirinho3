import { Flex, Image } from '@chakra-ui/react';
import classes from './banner.module.css';
export default function Banner() {
  return (
    <Flex>
      <Image
        className={classes.image}
        src="./assets/images/CaseirinhoBanner.png"
      ></Image>
    </Flex>
  );
}
