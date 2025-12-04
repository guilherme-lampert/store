import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderService } from './services';
import { CreateOrderRequest } from './dto/requests';
import { CreateOrderResponse } from './dto/responses';

@Controller('orders')
export class OrdersController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @Post()
  async create(@Body() request: CreateOrderRequest) {
    const order = await this.createOrderService.exec(request);
    return new CreateOrderResponse(order);
  }
}
