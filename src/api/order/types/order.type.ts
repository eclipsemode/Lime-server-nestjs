export enum OrderType {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP',
}

export enum OrderStatus {
  new = 'new',
  accepted = 'accepted',
  production = 'production',
  produced = 'produced',
  delivery = 'delivery',
  completed = 'completed',
  deleted = 'deleted',
}

export enum PaymentType {
  CASH = 'CASH',
  CARD = 'CARD',
}

export default interface IOrder {
  id: string;
  totalPrice: string;
  totalAmount: string;
  type: OrderType;
  clientName: string;
  clientAddress?: string;
  clientEntrance?: string;
  clientFloor?: string;
  clientRoom?: string;
  clientTel: string;
  clientEmail?: string;
  preOrderDate?: Date;
  utensils: string;
  payment: PaymentType;
  commentary?: string;
  promoCodeId?: string;
  status: OrderStatus;
  channel?: number;
  userId?: string;
  branchId?: string;
  createdAt: Date;
}
