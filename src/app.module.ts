import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders';

@Module({
  imports: [
    OrdersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/store-db'),
  ],
})
export class AppModule {}
