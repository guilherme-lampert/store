import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { FindProductResponse, FindProductsApiResponse } from './responses';

@Injectable()
export class FindProductsService {
  constructor(private readonly httpService: HttpService) {}

  async exec(): Promise<FindProductResponse[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<FindProductsApiResponse>('https://dummyjson.com/products?limit=0')
        .pipe(
          catchError(() =>
            throwError(
              () => new InternalServerErrorException('Ocorreu um erro'),
            ),
          ),
        ),
    );
    return FindProductResponse.fromList(data);
  }
}
