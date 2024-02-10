import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductEntity } from 'src/module/product/entity/product.entity';

export const configDb = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const typeOrmOptions: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [ProductEntity],
    retryDelay: 3000,
    logging: true,
    synchronize: true,
  };

  return typeOrmOptions;
};
