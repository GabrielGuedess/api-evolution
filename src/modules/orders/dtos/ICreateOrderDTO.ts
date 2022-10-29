export interface ICreateOrderDTO {
  client_id: string;
  cart: string[];
  paymentIntentId: string;
  paymentMethod: PaymentMethodData | null;
}
