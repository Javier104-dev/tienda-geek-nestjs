import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { DbProductDto } from '../dto/db.product.dto';
import { NewProductDto } from '../dto/new.product.dto';

@Controller('geekstore/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<DbProductDto[]> {
    const products = await this.productService.getProducts();
    return products;
  }

  @Get(':id')
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DbProductDto> {
    const product = await this.productService.getProduct(id);
    return product;
  }

  @Post()
  async createProduct(@Body() body: NewProductDto): Promise<DbProductDto> {
    const createdProduct = await this.productService.createProduct(body);
    return createdProduct;
  }
}
