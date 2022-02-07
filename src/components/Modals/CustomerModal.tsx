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

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;

  name: string;
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  onChangeEmail: (event: ChangeEvent<HTMLInputElement>) => void;
  phone: string;
  onChangePhone: (event: ChangeEvent<HTMLInputElement>) => void;
  numberId: string;
  onChangeNumberId: (event: ChangeEvent<HTMLInputElement>) => void;
}

function CustomerModal({ 
  isOpen, 
  onClose, 
  name, 
  email, 
  phone, 
  numberId, 
  onChangeName, 
  onChangeEmail, 
  onChangePhone, 
  onChangeNumberId 
}: IModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Editar informações</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Stack spacing="1rem">
            <Stack>
              <label className="text-black-checkout font-semibold">Nome</label>
              <input 
                className="p-2 px-5 rounded-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                placeholder="Tony Stark"
                value={name}
                onChange={onChangeName}
              />
            </Stack>

            <Stack>
              <label className="text-black-checkout font-semibold">E-mail</label>
              <input 
                className="p-2 px-5 rounded-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                placeholder="user@pay.com"
                value={email}
                onChange={onChangeEmail}
              />
            </Stack>

            <Stack>
              <label className="text-black-checkout font-semibold">Identificação</label>
              <HStack spacing="0">
                <input 
                  className="w-1/2 p-2 px-5 rounded-l-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                  placeholder="DDD + número"
                  value={phone}
                  onChange={onChangePhone}
                />
                <input 
                  className="w-1/2 p-2 px-5 rounded-r-md text-gray-checkout border focus:outline-none focus:border-blue-checkout" 
                  placeholder="CPF"
                  value={numberId}
                  onChange={onChangeNumberId}
                />
              </HStack>
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Confirmar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { CustomerModal };