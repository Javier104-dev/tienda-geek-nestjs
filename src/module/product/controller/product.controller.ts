import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { DbProductDto } from '../dto/db.product.dto';
import { NewProductDto } from '../dto/new.product.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateProductDto } from '../dto/update.product.dto';

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

  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: NewProductDto,
  ) {
    const UpdateProduct = plainToInstance(UpdateProductDto, { id, ...body });
    const UpdatedProduct =
      await this.productService.updateProduct(UpdateProduct);
    return UpdatedProduct;
  }
}
