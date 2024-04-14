import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSolutionDto: CreateSolutionDto) {
    return this.solutionsService.create(createSolutionDto);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSolutionDto: UpdateSolutionDto,
  ) {
    return this.solutionsService.update(id, updateSolutionDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.solutionsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Get('by-group')
  async byGroup() {
    return await this.solutionsService.getDistinctGroups();
  }

  @Get('types/:group')
  async distinctTypesByGroup(@Param('group') group: string) {
    return await this.solutionsService.getDistinctTypesByGroup(group);
  }

  @Get('codes/:group/:type')
  async getCodesByGroupAndType(
    @Param('group') group: string,
    @Param('type') type: string,
  ) {
    return await this.solutionsService.getCodesByGroupAndType(group, type);
  }

  @Get('codes/:group/:type/:code')
  async getSolutionsByGroupTypeAndCode(
    @Param('group') group: string,
    @Param('type') type: string,
    @Param('code') code: string,
  ) {
    return await this.solutionsService.getSolutionsByGroupTypeAndCode(
      group,
      type,
      code,
    );
  }

  @Get('control/:group/:type/:control?')
  async getCodesByGroupAndTypeControl(
    @Param('group') group: string,
    @Param('type') type: string,
    @Param('control') control?: string,
  ) {
    return await this.solutionsService.getCodesByGroupAndType(
      group,
      type,
      control,
    );
  }

  @Get('control/:group/:type/:code/:control?')
  async getSolutionsByGroupTypeAndCodeControl(
    @Param('group') group: string,
    @Param('type') type: string,
    @Param('code') code: string,
    @Param('control') control?: string,
  ) {
    return await this.solutionsService.getSolutionsByGroupTypeAndCode(
      group,
      type,
      code,
      control,
    );
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.solutionsService.byId(id);
  }
}
