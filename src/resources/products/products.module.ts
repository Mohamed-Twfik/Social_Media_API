import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategoryModule } from 'src/resources/product-category/product-category.module';
import { UsersModule } from 'src/resources/users/users.module';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PriceTypeModule } from '../price-type/price-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    UsersModule,
    ProductCategoryModule,
    PriceTypeModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
