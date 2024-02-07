import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductEntity } from '../entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { DbProductDto } from '../dto/db.product.dto';
import { NewProductDto } from '../dto/new.product.dto';
import { UpdateProductDto } from '../dto/update.product.dto';

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

  async createProduct(body: NewProductDto): Promise<DbProductDto> {
    const product = this.productEntity.create(body);
    const createdProduct = await this.productEntity.save(product);
    const productDto = plainToInstance(DbProductDto, createdProduct);
    return productDto;
  }

  async updateProduct(body: UpdateProductDto): Promise<DbProductDto> {
    const product = await this.productEntity.preload(body);

    if (!product)
      throw new NotFoundException(
        `No se encontraron productos con el id: ${body.id}`,
      );

    const updatedProduct = await this.productEntity.save(product);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<DeleteResult> {
    try {
      const product = await this.productEntity.delete(id);
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        `No se pudo eliminar el producto con id: ${id}`,
      );
    }
  }
}
