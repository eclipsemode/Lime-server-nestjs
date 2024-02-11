import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PromoCodeService } from './promo-code.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PromoCodeCreateReqDto } from './dto/promoCode-create-req.dto';
import { PromoCodeCreateResDto } from './dto/promoCode-create-res.dto';
import { PromoCodeGetAllResDto } from './dto/promoCode-getAll-res.dto';
import { PromoCodeDeleteResDto } from './dto/promoCode-delete-res.dto';
import { PromoCodeChangeResDto } from './dto/promoCode-change-res.dto';
import { PromoCodeChangeReqDto } from './dto/promoCode-change-req.dto';
import { RoleGuard } from '../user/role.guard';
import { Role } from '../user/role.decorator';
import { UserRole } from '../user/types/user.type';

@ApiTags('promo-code')
@Controller('promo-code')
export class PromoCodeController {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @Get()
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get all promo codes',
    description: 'Get all promo codes',
  })
  @ApiFoundResponse({
    type: PromoCodeGetAllResDto,
    description: 'Successfully found',
    isArray: true,
  })
  getAll() {
    return this.promoCodeService.getAll();
  }

  @Post()
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create promo code',
    description: 'Create promo code',
  })
  @ApiCreatedResponse({
    type: PromoCodeCreateResDto,
    description: 'Promo code successfully created',
  })
  create(@Body() promoCodeCreateReqDto: PromoCodeCreateReqDto) {
    return this.promoCodeService.create(promoCodeCreateReqDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Change promo code',
    description: 'Change promo code by id',
  })
  @ApiOkResponse({
    type: PromoCodeChangeResDto,
    description: 'Successfully changed',
  })
  change(
    @Param('id') id: string,
    @Body() promoCodeChangeReqDto: PromoCodeChangeReqDto,
  ) {
    return this.promoCodeService.change(id, promoCodeChangeReqDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete promo code',
    description: 'Delete promo code by id',
  })
  @ApiOkResponse({
    type: PromoCodeDeleteResDto,
    description: 'Successfully deleted',
  })
  delete(@Param('id') id: string) {
    return this.promoCodeService.delete(id);
  }

  @Get('check/:code')
  @ApiOperation({
    summary: 'Check promoCode with code',
    description: 'Check promoCode with code',
  })
  @ApiOkResponse({
    type: PromoCodeGetAllResDto,
    description: 'Successfully checked',
  })
  check(@Param('code') code: string) {
    return this.promoCodeService.check(code);
  }
}
