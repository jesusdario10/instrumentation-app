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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSolutionDto: CreateSolutionDto) {
    return this.solutionsService.create(createSolutionDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSolutionDto: UpdateSolutionDto,
  ) {
    return this.solutionsService.update(id, updateSolutionDto);
  }

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

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.solutionsService.byId(id);
  }
}
