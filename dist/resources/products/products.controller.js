"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../../utils/decorators/get-user.decorator");
const ObjectId_pipe_1 = require("../../utils/pipes/ObjectId.pipe");
const queryParam_pipe_1 = require("../../utils/pipes/queryParam.pipe");
const product_dto_1 = require("./dto/product.dto");
const product_id_pipe_1 = require("./pipes/product-id.pipe");
const products_service_1 = require("./products.service");
const product_pipe_1 = require("./pipes/product.pipe");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(user, createProductDto) {
        return this.productsService.create(createProductDto, user);
    }
    async findAll(queryParams, user) {
        return this.productsService.findAll(queryParams, user);
    }
    update(product, queryParams, updateProductDto, user) {
        return this.productsService.updateRoute(product, updateProductDto, user, queryParams);
    }
    remove(product, queryParams) {
        return this.productsService.remove(product, queryParams);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Redirect)('/products'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(product_pipe_1.ProductPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_dto_1.ProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('update/:productId'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Param)('productId', ObjectId_pipe_1.ObjectIdPipe, product_id_pipe_1.ProductIdPipe)),
    __param(1, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __param(2, (0, common_1.Body)(product_pipe_1.ProductPipe)),
    __param(3, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, product_dto_1.ProductDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('delete/:productId'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Param)('productId', ObjectId_pipe_1.ObjectIdPipe, product_id_pipe_1.ProductIdPipe)),
    __param(1, (0, common_1.Query)(queryParam_pipe_1.QueryParamPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map