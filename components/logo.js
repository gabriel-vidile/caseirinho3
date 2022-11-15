import { Image } from '@chakra-ui/react';
export default function Logo() {
  return (
    <Image
      ml={5}
      width={['130', '150']}
      height={['130', '150']}
      borderRadius="20px"
      src="/assets/images/CaseirinhoLogo.png"
    ></Image>
  );
}
