import { HStack, Spinner, Stack, useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { FormEvent, useEffect, useState } from "react";
import { apiCEP } from "../../services/apiCEP";
import { Button } from "../Button";
import { AddressModal } from "../Modals/AddressModal";

interface INewCustomerFormProps {
  productPrice: number;
  productName: string;
  productId: string;
}

function NewCustomerForm({ productPrice, productName, productId }: INewCustomerFormProps) {
  const addToast = useToast();

  const [openAddressModal, setOpenAddressModal] = useState(false);

  const [loadingData, setLoadingData] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardName, setCardName] = useState("");

  const [phone, setPhone] = useState("");
  const [numberId, setNumberId] = useState("");

  const [myAddress, setMyAddress] = useState("");

  const [state, setState] = useState("PR");
  const [city, setCity] = useState("Campo Mourão");
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [reference, setReference] = useState("");
  const [zipcode, setZipcode] = useState("");

  function handleOpenAddressModal() {
    setOpenAddressModal(true);
  }

  function closeAddressModal() {
    setOpenAddressModal(false);
  }

  function validateData(e: FormEvent<HTMLDivElement>) {
    e.preventDefault();
    if(email.indexOf("@") !== -1 && email.indexOf(".") !== -1) {
      if(Number(cardDate.substring(0, 2)) !== 0 && 
      Number(cardDate.substring(0, 2)) < 13 &&
      Number(cardDate.substring(3)) >= Number(format(new Date(), 'MM'))) {
        if(myAddress !== "") {
          if(name !== "" && cardName !== "" && cardNumber !== "" && cardCVV !== "" && phone !== "" && numberId !== "") {
            // CHAME SUA API AQUI. Lembre-se de armazenar de algum
            // modo uma informação para consultar os dados do customer
            // criado a partir dos dados informados.

            setLoadingData(true);
            setTimeout(() => {
              addToast({
                status: "success",
                title: "Seu pagamento foi efetuado",
                description: "Levaremos você para nosso site agora.",
                variant: "top-accent",
                isClosable: true,
                position: "top",
                duration: 4000
              })
              setTimeout(() => {
                if(process.env.NEXT_PUBLIC_REDIRECT_URL){
                  window.location.href = process.env.NEXT_PUBLIC_REDIRECT_URL;
                }
              }, 3000)
              setLoadingData(false);
            }, 3000)
          } else {
            addToast({
              status: "error",
              title: "Aconteceu um erro",
              description: "Precisamos de mais dados para efetuar o pagamento.",
              variant: "top-accent",
              isClosable: true,
              position: "top",
              duration: 4000
            })
          }
        } else {
          addToast({
            status: "error",
            title: "Aconteceu um erro",
            description: "É necessário que nos informe um endereço para controle do pagamento.",
            variant: "top-accent",
            isClosable: true,
            position: "top",
            duration: 4000
          })
        }
      } else {
        addToast({
          status: "error",
          title: "Aconteceu um erro",
          description: "A data de validade do cartão é inválida. Por favor, revise os seus dados.",
          variant: "top-accent",
          isClosable: true,
          position: "top",
          duration: 4000
        })
      }
    } else {
      addToast({
        status: "error",
        title: "Aconteceu um erro",
        description: "O e-mail informado é inválido. Por favor, revise os seus dados.",
        variant: "top-accent",
        isClosable: true,
        position: "top",
        duration: 4000
      })
    }
  }

  function maskValidate(val: string) {
    val = val.replace(/\D/g, "")
    val = val.replace(/(\d{2})(\d)/, "$1/$2")
    val = val.replace(/(\d{2})(\d)/, "$1")
    return val
  }

  async function getAddressByCEP() {
    const response = await apiCEP.get(`${zipcode}/json`);
    setDistrict(response.data.bairro);
    setStreet(response.data.logradouro);
    setCity(response.data.localidade);
    setState(response.data.uf);
  }

  function getUserData() {
    // Essa funcao deve buscar em seu banco de dados 
    // valores pré definidos para os campos "email" e "name"

    // Também há a possibilidade de informar valores 
    // pré definidos para os campos relacionados ao endereço
    // do usuário

    // ABAIXO UMA SIMULAÇÃO DE REQUEST
    // Obs: O estado denominado LoadingData pode ser usado para
    //      melhorar a experiência do usuário
    setLoadingData(true);
    setTimeout(() => {
      setName("Halt Zn");
      setEmail("halt@tw.com");
      setZipcode("87303115");
      setReference("Em frente ao BR3");
      setHouseNumber("1786");
      setLoadingData(false);
    }, 3000)
  }

  useEffect(() => {
    getUserData();
  }, [])

  useEffect(() => {
    if(zipcode.length === 8 || zipcode.length === 9) {
      getAddressByCEP();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipcode])

  useEffect(() => {
    if(street !== "" && city !== "" && state !== "" && district !== "" && reference !== "" && houseNumber !== "" && zipcode) {
      setMyAddress(`${street}, ${houseNumber}, ${city} - ${state}`);
    }
  }, [street, city, state, district, reference, houseNumber, zipcode])

  return (
    <>
      { loadingData ? (
        <div className="w-full flex items-center justify-center">
          <Spinner/>
        </div>
      ): (
        <Stack as="form" spacing="1.5rem" onSubmit={(e) => validateData(e)}>
          <Stack>
            <label className="text-black-checkout font-semibold">Nome</label>
            <input 
              className="p-2 px-5 rounded-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
              placeholder="Tony Stark"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Stack>
          
          <Stack>
            <label className="text-black-checkout font-semibold">E-mail</label>
            <input 
              className="p-2 px-5 rounded-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
              placeholder="user@pay.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Stack>

          <Stack>
            <label className="text-black-checkout font-semibold">Dados do cartão</label>
            <Stack spacing="0">
              <input 
                className="p-2 px-5 rounded-t-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                placeholder="4222 2222 2222 2222"
                maxLength={16}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <HStack spacing="0">
                <input 
                  className="w-1/2 p-2 px-5 rounded-bl-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                  placeholder="MM/AA"
                  maxLength={5}
                  value={cardDate}
                  onChange={(e) => setCardDate(maskValidate(e.target.value))}
                />
                <input 
                  className="w-1/2 p-2 px-5 rounded-br-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                  placeholder="CVV"
                  maxLength={3}
                  value={cardCVV}
                  onChange={(e) => setCardCVV(e.target.value)}
                />
              </HStack>
            </Stack>
          </Stack>

          <Stack>
            <label className="text-black-checkout font-semibold">Titular do cartão</label>
            <input 
              className="p-2 px-5 rounded-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
              placeholder="João da Silva"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </Stack>

          <Stack>
            <label className="text-black-checkout font-semibold">Identificação</label>
            <HStack spacing="0">
              <input 
                className="w-1/2 p-2 px-5 rounded-l-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                placeholder="DDD + número"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}  
              />
              <input 
                className="w-1/2 p-2 px-5 rounded-r-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                placeholder="CPF"
                maxLength={11}
                value={numberId}
                onChange={(e) => setNumberId(e.target.value)}
              />
            </HStack>
          </Stack>

          <Stack>
            <label className="text-black-checkout font-semibold">Endereço</label>
            <HStack>
              <button onClick={handleOpenAddressModal} className={`w-full p-2 px-5 rounded text-left ${ myAddress !== "" ? "text-black-checkout" : "text-gray-checkout-2" } border focus:outline-none focus:border-blue-checkout`} type="button">
                { myAddress !== "" ? myAddress : "Endereço não informado" }
              </button>
            </HStack>
          </Stack>

          <Button type="submit">Realizar o pagamento</Button>
        </Stack>
      ) }

      <AddressModal
        isOpen={openAddressModal}
        onClose={closeAddressModal}
        state={state}
        onChangeState={(e) => setState(e.target.value)}
        city={city}
        onChangeCity={(e) => setCity(e.target.value)}
        street={street}
        onChangeStreet={(e) => setStreet(e.target.value)}
        district={district}
        onChangeDistrict={(e) => setDistrict(e.target.value)}
        houseNumber={houseNumber}
        onChangeHouseNumber={(e) => setHouseNumber(e.target.value)}
        reference={reference}
        onChangeReference={(e) => setReference(e.target.value)}
        zipcode={zipcode}
        onChangeZipcode={(e) => setZipcode(e.target.value)}
      />
    </>
  )
}

export { NewCustomerForm };