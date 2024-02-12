import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { DbProductDto } from '../dto/db.product.dto';
import { NewProductDto } from '../dto/new.product.dto';
import { UpdateProductDto } from '../dto/update.product.dto';
import { DeleteResult } from 'typeorm';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly utilsService: UtilsService,
  ) {}

  async getProducts(): Promise<DbProductDto[]> {
    const products = await this.productRepository.getProducts();
    products.map(this.utilsService.concatUrl);
    return products;
  }

  async getProduct(id: number): Promise<DbProductDto> {
    const product = await this.productRepository.getProduct(id);
    this.utilsService.concatUrl(product);
    return product;
  }

  async createProduct(body: NewProductDto): Promise<DbProductDto> {
    const product = await this.productRepository.createProduct(body);
    this.utilsService.concatUrl(product);
    return product;
  }

  async updateProduct(body: UpdateProductDto): Promise<DbProductDto> {
    const product = await this.productRepository.updateProduct(body);
    this.utilsService.concatUrl(product);
    return product;
  }

  async deleteProduct(id: number): Promise<DeleteResult> {
    return this.productRepository.deleteProduct(id);
  }
}
