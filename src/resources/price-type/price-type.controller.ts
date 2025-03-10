import { Body, Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import { UserDocument } from 'src/resources/users/entities/user.entity';
import { GetUser } from 'src/utils/decorators/get-user.decorator';
import { ObjectIdPipe } from 'src/utils/pipes/ObjectId.pipe';
import { QueryParamPipe } from 'src/utils/pipes/queryParam.pipe';
import { PriceTypeDto } from './dto/price-type.dto';
import { PriceTypeDocument } from './entities/price-type.entity';
import { PriceTypeIdPipe } from './pipes/price-type-id.pipe';
import { PriceTypePipe } from './pipes/price-type.pipe';
import { PriceTypeService } from './price-type.service';

@Controller('priceType')
export class PriceTypeController {
  constructor(private readonly priceTypeService: PriceTypeService) { }

  @Post()
  @Redirect('/priceType')
  create(
    @Body(PriceTypePipe) createPriceTypeDto: PriceTypeDto,
    @GetUser() user: UserDocument,
  ) {
    return this.priceTypeService.create(createPriceTypeDto, user);
  }

  @Get()
  @Render('index')
  findAll(
    @Query(QueryParamPipe) queryParams: any,
    @GetUser() user: UserDocument,
  ) {
    return this.priceTypeService.findAll(queryParams, user);
  }

  @Post('update/:priceTypeId')
  @Redirect('/priceType?sort=-updatedAt')
  update(
    @Param('priceTypeId', ObjectIdPipe, PriceTypeIdPipe) priceType: PriceTypeDocument,
    @Body(PriceTypePipe) updatePriceTypeDto: PriceTypeDto,
    @GetUser() user: UserDocument,
  ) {
    return this.priceTypeService.update(priceType, updatePriceTypeDto, user);
  }

  @Get('delete/:priceTypeId')
  @Redirect('/priceType')
  remove(
    @Param('priceTypeId', ObjectIdPipe, PriceTypeIdPipe) priceType: PriceTypeDocument,
  ) {
    return this.priceTypeService.remove(priceType);
  }
}
