"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_category_module_1 = require("../product-category/product-category.module");
const users_module_1 = require("../users/users.module");
const product_entity_1 = require("./entities/product.entity");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const price_type_module_1 = require("../price-type/price-type.module");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: product_entity_1.Product.name,
                    schema: product_entity_1.ProductSchema,
                },
            ]),
            users_module_1.UsersModule,
            product_category_module_1.ProductCategoryModule,
            price_type_module_1.PriceTypeModule
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        exports: [products_service_1.ProductsService],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map