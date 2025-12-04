import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class Item {
  @Prop({ type: Number })
  productId: number;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: Number })
  total: number;
}

@Schema()
export class Order {
  @Prop({ type: String })
  customerName: string;

  @Prop({ type: [Item] })
  items: Item[];

  @Prop({ type: Number })
  total: number;

  @Prop({ type: String })
  notes?: string;
}

export type OrderDocument = HydratedDocument<Order>;
export const OrderSchema = SchemaFactory.createForClass(Order);
