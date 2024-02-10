import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { DbProductDto } from '../dto/db.product.dto';
import { NewProductDto } from '../dto/new.product.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateProductDto } from '../dto/update.product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/configMulter';

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
  @UseInterceptors(FileInterceptor('image', multerOptions()))
  async createProduct(
    @Body() body: NewProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<DbProductDto> {
    if (file) body.image = file.filename;

    const createdProduct = await this.productService.createProduct(body);
    return createdProduct;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions()))
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: NewProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) body.image = file.filename;

    const UpdateProduct = plainToInstance(UpdateProductDto, { id, ...body });
    const UpdatedProduct =
      await this.productService.updateProduct(UpdateProduct);
    return UpdatedProduct;
  }

  @Delete(':id')
  async delelteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DbProductDto> {
    const product = await this.productService.getProduct(id);
    await this.productService.deleteProduct(product.id);
    return product;
  }
}
