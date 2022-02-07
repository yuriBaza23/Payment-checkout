import { 
  HStack,
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Stack
} from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { Button } from "../Button";
import { states } from "../../json/states";
import { cities } from "../../json/cities";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;

  state: string;
  onChangeState: (event: ChangeEvent<HTMLSelectElement>) => void;
  city: string;
  onChangeCity: (event: ChangeEvent<HTMLSelectElement>) => void;
  street: string;
  onChangeStreet: (event: ChangeEvent<HTMLInputElement>) => void;
  district: string;
  onChangeDistrict: (event: ChangeEvent<HTMLInputElement>) => void;
  houseNumber: string;
  onChangeHouseNumber: (event: ChangeEvent<HTMLInputElement>) => void;
  reference: string;
  onChangeReference: (event: ChangeEvent<HTMLInputElement>) => void;
  zipcode: string;
  onChangeZipcode: (event: ChangeEvent<HTMLInputElement>) => void;
}

function AddressModal({ 
  isOpen, 
  onClose, 
  state, 
  onChangeState, 
  city, 
  onChangeCity, 
  street,
  onChangeStreet,
  district,
  onChangeDistrict,
  houseNumber,
  onChangeHouseNumber,
  reference,
  onChangeReference,
  zipcode,
  onChangeZipcode
}: IModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Endereço</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Stack spacing="0">
            <HStack spacing="0">
              <select value={state} onChange={onChangeState} className="w-1/2 p-2.5 rounded-tl-md px-5 text-gray-checkout border focus:outline-none focus:border-blue-checkout" placeholder="Estado">
                { states.map((state) => (
                  <option key={state.id_uf} value={state.sigla}>{state.nome}</option>
                )) }
              </select>
              <select value={city} onChange={onChangeCity} className="w-1/2 p-2.5 rounded-tr-md px-5 text-gray-checkout border focus:outline-none focus:border-blue-checkout" placeholder="Cidade">
                { cities.filter(el => el.uf === state)[0]?.cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                )) }
              </select>
            </HStack>
            <input 
              className="p-2 px-5 text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
              placeholder="Rua/Avenida"
              value={street}
              onChange={onChangeStreet}
            />
            <HStack spacing="0">
              <input 
                className="w-1/2 p-2 px-5 text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                placeholder="Bairro"
                value={district}
                onChange={onChangeDistrict}
              />
              <input 
                className="w-1/2 p-2 px-5 text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                placeholder="Número"
                value={houseNumber}
                onChange={onChangeHouseNumber}
              />
            </HStack>
            <HStack spacing="0">
              <input 
                className="w-1/2 p-2 px-5 rounded-bl-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                placeholder="Complemento"
                value={reference}
                onChange={onChangeReference}
              />
              <input 
                className="w-1/2 p-2 px-5 rounded-br-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                placeholder="CEP"
                maxLength={8}
                value={zipcode}
                onChange={onChangeZipcode}
              />
            </HStack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Confirmar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { AddressModal };