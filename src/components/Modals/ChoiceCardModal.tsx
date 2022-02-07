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
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../Button";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;

  cardId: string;
  onChangeCardId: (value: string) => void;
  cards: ICreditCard[]
}

export interface ICreditCard {
  name: string;
  id: number;
  number: string;
}

function ChoiceCardModal({ 
  isOpen, 
  onClose, 
  cardId,
  onChangeCardId,
  cards
}: IModalProps) {
  function choiceCard(value: string) {
    onChangeCardId(value);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Escolher cartão</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Stack spacing="1rem">
            { cards.map(card => {
              if(card.id === Number(cardId)) {
                return(
                  <div key={card.id} onClick={() => choiceCard(card.id.toString())} className="rounded bg-product-view p-4 px-8 cursor-pointer border border-transparent hover:border-blue-checkout transition-all duration-300">
                    <h6 className="text-gray-checkout text-sm font-semibold">Cartão selecionado</h6>
                    <h1 className="text-black-checkout text-lg font-semibold mt-2 mb-0">{card.name}</h1>
                    <h2 className="text-black-checkout text-md font-regular">{card.number}</h2>
                  </div>
                )
              } else {
                return(
                  <div key={card.id} onClick={() => choiceCard(card.id.toString())} className="rounded bg-product-view p-4 px-8 cursor-pointer border border-transparent hover:border-blue-checkout transition-all duration-300">
                    <h1 className="text-black-checkout text-lg font-semibold mt-2 mb-0">{card.name}</h1>
                    <h2 className="text-black-checkout text-md font-regular">{card.number}</h2>
                  </div>
                )
              }
            }) }
          </Stack>
        </ModalBody>

        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export { ChoiceCardModal };