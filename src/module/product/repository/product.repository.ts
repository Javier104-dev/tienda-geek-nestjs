import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { DbProductDto } from '../dto/db.product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productEntity: Repository<ProductEntity>,
  ) {}

  async getProducts(): Promise<DbProductDto[]> {
    const products = await this.productEntity.find();
    const productsDto = plainToInstance(DbProductDto, products);
    return productsDto;
  }

  async getProduct(id: number): Promise<DbProductDto> {
    const product = await this.productEntity.findOne({ where: { id } });

    if (!product)
      throw new NotFoundException(
        `No se encontraron productos con el id: ${id}`,
      );

    const productDto = plainToInstance(DbProductDto, product);
    return productDto;
  }
}
