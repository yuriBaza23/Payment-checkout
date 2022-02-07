import { Stack } from "@chakra-ui/react";
import React from "react";
import { Button } from "../Button";
import { CustomerForm } from "./CustomerForm";
import { NewCustomerForm } from "./NewCustomerForm";

interface IPaymentDataProps {
  customerExists?: boolean;
  customerId: string;
  productPrice: number;
  productName: string;
  productId: string;
}

function PaymentData({ customerExists = false, customerId, productPrice, productName, productId }: IPaymentDataProps) {
  return (
    <Stack spacing="2rem">
      <Button buttonBackground="bg-black-checkout">Pagar com PIX</Button>

      <div>
        <h1 className="text-2xl font-semibold text-black-checkout">Informações de pagamento</h1>
        <h2 className="text-md text-black-checkout">Preencha as informações presentes para efetuar o pagamento</h2>
      </div>

      { customerExists ? (
        <CustomerForm
          customerId={customerId}
          productId={productId}
          productName={productName}
          productPrice={productPrice}
        />
      ) : (
        <NewCustomerForm
          productId={productId}
          productName={productName}
          productPrice={productPrice}
        />
      ) }
    </Stack>
  )
}

export { PaymentData };