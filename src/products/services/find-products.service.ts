import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { FindProductsApiResponse, FindProductResponse } from './responses';

@Injectable()
export class FindProductsService {
  constructor(private readonly httpService: HttpService) {}

  async exec(): Promise<FindProductResponse[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<FindProductsApiResponse>('https://dummyjson.com/products?limit=0')
        .pipe(
          catchError((error: AxiosError) => {
            throw 'An error happened!';
          }),
        ),
    );
    return FindProductResponse.fromList(data);
  }
}
