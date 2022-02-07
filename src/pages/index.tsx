import { Center, Flex, Spinner } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useJwt } from "react-jwt"
import { PaymentData } from '../components/PaymentData'
import { ProductView } from '../components/ProductView'

const Home: NextPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<any>("");
  const { decodedToken, reEvaluateToken } = useJwt(token);

  const [loadingPage, setLoadingPage] = useState(true);
  
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);

  async function getCustomer() {
    // Nessa função você utilizará de uma informação unica do
    // usuário em seu banco de dados para buscar os dados dele
    // no gateway de pagamentos.

    // Um detalhe importante é usar o LoadingPage para que a 
    // página seja visualmente mostrada somente após obter
    // as informações do usuário

    // Nesse Checkout usei um token JWT que contem as informações
    // necessárias. Você pode criar no seu back-end um mecanismo
    // que lhe retorna o token e após isso pode mandá-lo via query
    // na URL do checkout
    const myJSONString = JSON.stringify(decodedToken);
    setTimeout(() => {
      setCustomerId(`cus_${ JSON.parse(myJSONString)?.userId }`);
      setProductName(JSON.parse(myJSONString)?.productName);
      setProductImage(JSON.parse(myJSONString)?.productImage);
      setProductDescription(JSON.parse(myJSONString)?.productDescription);
      setProductPrice(JSON.parse(myJSONString)?.productPrice);
      setProductId(JSON.parse(myJSONString)?.productId);
      setLoadingPage(false);
    }, 3000);
  }

  useEffect(() => {
    if(router.query.nec) {
      setToken(router.query.nec);
      reEvaluateToken(router.query.nec as string);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    getCustomer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <>
      { loadingPage ? (
        <Flex w='100vw' h='100vh'>
          <Center w='100vw' h='100vh'>
            <Spinner/>
          </Center>
        </Flex>
      ) : (
        <Flex flexDirection={{ base: "column", lg: "row" }}>
          <aside className="
            lg:w-1/2 w-screen 
            lg:h-screen h-fit 
            bg-product-view 
            sm:p-24 p-12
            sm:px-24 md:px-46 xl:px-52 px-12
          ">
            <div  className="w-full h-full">
              <ProductView
                productTitle={productName}
                productPrice={productPrice}
                productImage={productImage}
                productDescription={productDescription}
              />
            </div>
          </aside>
          <div className="
            lg:w-1/2 w-screen 
            h-screen 
            sm:p-24 p-12 
            sm:px-24 md:px-46 xl:px-52 px-12
          ">
            <div  className="w-full h-full">
              <PaymentData
                customerExists={!!customerId}
                customerId={customerId}
                productId={productId}
                productName={productName}
                productPrice={productPrice}
              />
            </div>
          </div>
        </Flex>
      ) } 
    </>
  )
}

export default Home
