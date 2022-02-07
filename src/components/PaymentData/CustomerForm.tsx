import { HStack, Spinner, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiCreditCard } from "react-icons/fi";
import { apiCEP } from "../../services/apiCEP";
import { Button } from "../Button";
import { AddressModal } from "../Modals/AddressModal";
import { ChoiceCardModal, ICreditCard } from "../Modals/ChoiceCardModal";
import { CustomerModal } from "../Modals/CustomerModal";

interface ICustomerFormProps {
  customerId: string;
  productPrice: number;
  productName: string;
  productId: string;
}

function CustomerForm({ customerId, productPrice, productName, productId }: ICustomerFormProps) {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [openChoiceCardModal, setOpenChoiceCardModal] = useState(false);

  const [loadingData, setLoadingData] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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

  const [cardId, setCardId] = useState("1");
  const [cards, setCards] = useState<ICreditCard[]>([]);

  function handleOpenAddressModal() {
    setOpenAddressModal(true);
  }

  function handleOpenCustomerModal() {
    setOpenCustomerModal(true);
  }

  function handleOpenChoiceCardModal() {
    setOpenChoiceCardModal(true);
  }

  function closeAddressModal() {
    setOpenAddressModal(false);
  }

  function closeCustomerModal() {
    setOpenCustomerModal(false);
  }

  function closeChoiceCardModal() {
    setOpenChoiceCardModal(false);
  }

  async function getAddressByCEP() {
    const response = await apiCEP.get(`${zipcode}/json`);
    setDistrict(response.data.bairro);
    setStreet(response.data.logradouro);
    setCity(response.data.localidade);
    setState(response.data.uf);
  }

  function getUserData() {
    // Essa funcao deve buscar no gatway de pagamentos
    // os valores relacionados ao usuário e ao endereço dele
    // e setar esses valores nas variáveis correspondentes

    // ABAIXO UMA SIMULAÇÃO DE REQUEST
    // Obs: O estado denominado LoadingData pode ser usado para
    //      melhorar a experiência do usuário
    setLoadingData(true);
    setTimeout(() => {
      setName("Halt Zn");
      setEmail("halt@tw.com");
      setPhone("44998179673");
      setNumberId("98762509376");
      setZipcode("87303115");
      setReference("Em frente ao BR3");
      setHouseNumber("1786");
      setLoadingData(false);

      setCards([
        {
          id: 1,
          name: "Halt Zn",
          number: "xxxx xxxx xxxx 9867"
        },
        {
          id: 2,
          name: "Ka Zoe",
          number: "xxxx xxxx xxxx 6587"
        },
        {
          id: 3,
          name: "Norik Mthz",
          number: "xxxx xxxx xxxx 2649"
        },
      ])
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
      ) : (
        <Stack spacing="1.5rem">
          <HStack justifyContent="space-between">
            <Stack spacing="0">
              <label className="text-black-checkout font-semibold">{ name }</label>
              <span className="text-gray-checkout text-sm">#{ customerId }</span>
            </Stack>

            <button onClick={handleOpenCustomerModal} className="rounded text-blue-checkout hover:underline">Editar</button>
          </HStack>

          <button onClick={handleOpenChoiceCardModal} className="
            flex
            items-center
            rounded 
            bg-product-view 
            p-4 
            px-8 
            text-left 
            text-black-checkout
            font-semibold
            transition-all
            duration-300 
            hover:opacity-75
          ">
            <FiCreditCard style={{ marginRight: '1rem' }}/>
            Meus cartões
          </button>

          <div className="rounded bg-product-view p-4 px-8">
            <h6 className="text-gray-checkout text-sm font-semibold">Cartão selecionado</h6>
            <h1 className="text-black-checkout text-lg font-semibold mt-2 mb-0">{cards.filter(el => el.id === Number(cardId))[0].name}</h1>
            <h2 className="text-black-checkout text-md font-regular">{cards.filter(el => el.id === Number(cardId))[0].number}</h2>
          </div>

          <Stack>
            <label className="text-black-checkout font-semibold">Endereço</label>
            <HStack>
              <button onClick={handleOpenAddressModal} className={`w-full p-2 px-5 rounded text-left ${ myAddress !== "" ? "text-black-checkout" : "text-gray-checkout-2" } border focus:outline-none focus:border-blue-checkout`} type="button">
                { myAddress !== "" ? myAddress : "Endereço não informado" }
              </button>
            </HStack>
          </Stack>

          <Button>Realizar o pagamento</Button>
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

      <CustomerModal
        isOpen={openCustomerModal}
        onClose={closeCustomerModal}
        name={name}
        onChangeName={(e) => setName(e.target.value)}
        email={email}
        onChangeEmail={(e) => setEmail(e.target.value)}
        phone={phone}
        onChangePhone={(e) => setPhone(e.target.value)}
        numberId={numberId}
        onChangeNumberId={(e) => setNumberId(e.target.value)}
      />

      <ChoiceCardModal
        isOpen={openChoiceCardModal}
        onClose={closeChoiceCardModal}
        cardId={cardId}
        onChangeCardId={(e) => setCardId(e)}
        cards={cards}
      />
    </>
  )
}

export { CustomerForm };