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
import { BranchService } from './branch.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBranchReqDto } from './dto/create-branch-req.dto';
import { CreateBranchResDto } from './dto/create-branch-res.dto';
import { GetAllBranchesResDto } from './dto/get-all-branches-res.dto';
import { DeleteBranchResDto } from './dto/delete-branch-res.dto';
import { ChangeBranchReqDto } from './dto/change-branch-req.dto';
import { ChangeBranchResDto } from './dto/change-branch-res.dto';
import { RoleGuard } from '../user/role.guard';
import { Role } from '../user/role.decorator';
import { UserRole } from '../user/types/user.type';

@ApiTags('branch')
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all branches',
    description: 'Get all branches',
  })
  @ApiFoundResponse({
    type: GetAllBranchesResDto,
    isArray: true,
  })
  getAll() {
    return this.branchService.getAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Create branch',
    description: 'Creating branch',
  })
  @ApiCreatedResponse({
    type: CreateBranchResDto,
    description: 'Branch successfully created',
  })
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  create(@Body() createBranchReqDto: CreateBranchReqDto) {
    return this.branchService.create(createBranchReqDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Change branch name',
    description: 'Change branch name',
  })
  @ApiCreatedResponse({
    type: ChangeBranchResDto,
    description: 'Successfully changed',
  })
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  change(
    @Param('id') id: string,
    @Body() changeBranchReqDto: ChangeBranchReqDto,
  ) {
    return this.branchService.change(changeBranchReqDto, id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete branch',
    description: 'Deleting branch',
  })
  @ApiOkResponse({
    type: DeleteBranchResDto,
    description: 'Successfully deleted',
  })
  @UseGuards(RoleGuard)
  @Role(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  delete(@Param('id') id: string) {
    return this.branchService.delete(id);
  }
}
