import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './schemas';
import { HttpModule } from '@nestjs/axios';
import { CreateOrderService } from './services';
import { OrderRepository } from './repositories';
import { ProductsModule } from 'src/products';

@Module({
  imports: [
    ProductsModule,
    HttpModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [CreateOrderService, OrderRepository],
})
export class OrdersModule {}
