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
} from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSolutionDto: CreateSolutionDto) {
    return this.solutionsService.create(createSolutionDto);
  }

  @Get()
  findAll() {
    return this.solutionsService.findAll();
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.solutionsService.byId(id);
  }

  @Get('by-type/:type')
  async byType(@Param('type') type: string) {
    return await this.solutionsService.byType(type);
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
}
