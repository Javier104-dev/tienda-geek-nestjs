import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { DbProductDto } from '../dto/db.product.dto';
import { NewProductDto } from '../dto/new.product.dto';
import { UpdateProductDto } from '../dto/update.product.dto';
import { DeleteResult } from 'typeorm';

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

  async updateProduct(body: UpdateProductDto): Promise<DbProductDto> {
    return this.productRepository.updateProduct(body);
  }

  async deleteProduct(id: number): Promise<DeleteResult> {
    return this.productRepository.deleteProduct(id);
  }
}
