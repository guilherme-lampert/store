import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FindProductsService } from './services/find-products.service';

@Module({
  imports: [HttpModule],
  providers: [FindProductsService],
  exports: [FindProductsService],
})
export class ProductsModule {}
