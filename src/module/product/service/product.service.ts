import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(): Promise<any[]> {
    const products = await this.productRepository.getProducts();
    return products;
  }
}
