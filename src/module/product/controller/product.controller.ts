import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../service/product.service';

@Controller('geekstore')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('product')
  async getProducts(): Promise<any[]> {
    const products = await this.productService.getProducts();
    return products;
  }
}
