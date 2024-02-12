import { Injectable } from '@nestjs/common';
import { DbProductDto } from '../dto/db.product.dto';

@Injectable()
export class UtilsService {
  concatUrl(product: DbProductDto) {
    const URL = 'http://127.0.0.1:8080/geekstoreimage/';

    if (product.image) product.image = `${URL}${product.image}`;
  }
}
