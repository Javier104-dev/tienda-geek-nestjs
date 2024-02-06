import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { DbProductDto } from '../dto/db.product.dto';

@Controller('geekstore/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<any[]> {
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
  async createProduct() {

  }
}
