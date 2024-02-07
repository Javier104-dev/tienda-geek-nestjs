import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { DbProductDto } from '../dto/db.product.dto';
import { NewProductDto } from '../dto/new.product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(): Promise<DbProductDto[]> {
    const products = await this.productRepository.getProducts();
    return products;
  }

  async getProduct(id: number): Promise<DbProductDto> {
    return this.productRepository.getProduct(id);
  }

  async createProduct(body: NewProductDto): Promise<DbProductDto> {
    return this.productRepository.createProduct(body);
  }
}
