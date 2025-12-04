import { OrderDocument } from 'src/orders/schemas';

export class CreateOrderResponse {
  _id: string;

  constructor(params: OrderDocument) {
    this._id = params._id.toString();
  }
}
