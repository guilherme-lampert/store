import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderRequest } from '../dto/requests';
import { FindProductResponse } from 'src/products/services/responses';
import { FindProductsService } from 'src/products/services';
import { OrderDocument } from '../schemas';
import { OrderRepository } from '../repositories';

@Injectable()
export class CreateOrderService {
  constructor(
    private readonly findProductsService: FindProductsService,
    private readonly orderRepository: OrderRepository,
  ) {}

  async exec(request: CreateOrderRequest): Promise<OrderDocument> {
    const allProducts = await this.findProductsService.exec();

    const items = this.getOrderedProducts(request.items, allProducts);

    const total = items.reduce((sum, item) => sum + item.total, 0);

    const orderData = {
      customerName: request.customerName,
      items,
      total,
      notes: request.notes,
    };

    return await this.orderRepository.create(orderData);
  }

  private getOrderedProducts(
    requestItems: CreateOrderRequest['items'],
    products: FindProductResponse[],
  ) {
    return requestItems.map((item) => {
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        throw new NotFoundException(
          `Produto de id ${item.productId} não encontrado`,
        );
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Produto de id ${item.productId} possui apenas ${product.stock} unidades`,
        );
      }

      const total = item.quantity * product.price;

      return {
        productId: item.productId,
        price: product.price,
        quantity: item.quantity,
        total,
      };
    });
  }
}
