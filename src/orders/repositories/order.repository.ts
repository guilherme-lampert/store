import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas';

interface OrderItem {
  productId: number;
  price: number;
  quantity: number;
  total: number;
}

interface CreateOrderData {
  customerName: string;
  items: OrderItem[];
  total: number;
  notes?: string;
}

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(data: CreateOrderData): Promise<OrderDocument> {
    const newOrder = new this.orderModel(data);
    return await newOrder.save();
  }
}
