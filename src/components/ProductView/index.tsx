import { HStack, Image, Spinner, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface IProductViewProps {
  productTitle: string;
  productPrice: number;
  productImage: string;
  productDescription: string;
}

function ProductView({ productTitle, productPrice, productImage, productDescription }: IProductViewProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [])

  return (
    <>
      { loading ? (
        <div className="w-full flex items-center justify-center">
          <Spinner/>
        </div>
      ) : (
        <Stack spacing="2rem">
          <HStack
            px='1rem'
            justifyContent='space-between'
            alignItems='center'
          >
            <h1 className="text-2xl font-semibold text-black-checkout">{productTitle}</h1>
            <h2 className="text-xl text-gray-checkout">{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(productPrice/100)}</h2>
          </HStack>

          { productImage && (
            <Image
              display={{ base: "none", sm: "block" }}
              alt="product"
              src={productImage}
              //h="19rem"
              objectFit="cover"
              objectPosition="bottom"
              borderRadius=".8rem"
              opacity="1"
            />
          ) }

          <HStack
            px='1rem'
            justifyContent='space-between'
            alignItems='center'
          >
            <p className="text-md text-gray-checkout">{productDescription}</p>
          </HStack>
        </Stack>
      ) }
    </>
  )
}

export { ProductView };