import { Image } from '@chakra-ui/react';
export const Logo = () => {
  return (
    <Image
      ml={5}
      width={['130', '150']}
      height={['130', '150']}
      borderRadius="20px"
      src="/assets/images/CaseirinhoLogo.png"
      alt="Imagem de uma panela dourada com fundo vermelho e o nome caseirinho"
    ></Image>
  );
}
