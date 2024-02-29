import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { Model } from 'mongoose';
import { Solution } from './entities/solution.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectModel(Solution.name)
    private readonly solutionModel: Model<Solution>,
  ) {}

  async create(createSolutionDto: CreateSolutionDto) {
    try {
      const solution = await this.solutionModel.create(createSolutionDto);
      return solution;
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(`Data is ready exist`);
      else
        throw new InternalServerErrorException(
          `Can't create field - Check logs`,
        );
    }
  }

  findAll() {
    return `This action returns all solutions`;
  }

  async byId(id: string) {
    const solution = await this.solutionModel.findById(id);
    if (!solution) throw new NotFoundException(`Data not found`);
    return solution;
  }

  async byType(type: string) {
    const solutions = await this.solutionModel
      .find({ type })
      .sort({ order: 1 })
      .exec();
    if (!solutions || solutions.length === 0) {
      throw new NotFoundException(`Data not found`);
    }
    return solutions;
  }

  async byKind(kind: string) {
    const solutions = await this.solutionModel.find({ kind });
    if (!solutions) throw new NotFoundException(`Data not found`);
    return solutions;
  }

  async update(id: string, updateSolutionDto: UpdateSolutionDto) {
    const updatedSolution = await this.solutionModel.findByIdAndUpdate(
      id,
      updateSolutionDto,
      { new: true },
    );

    if (!updatedSolution) {
      throw new NotFoundException(`Solution with ID ${id} not found`);
    }
    return updatedSolution;
  }

  async remove(id: string) {
    const solution = await this.byId(id);

    await this.solutionModel.deleteOne({ _id: solution._id });

    return { message: `Solution with ID ${id} has been removed` };
  }

  async groupTypes(kind: string): Promise<string[]> {
    try {
      const distinctTypes = await this.getDistinctTypes(kind);
      return this.formatDistinctTypes(distinctTypes);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching and formatting distinct types',
      );
    }
  }

  private async getDistinctTypes(kind: string): Promise<{ type: string }[]> {
    const distinctTypes = await this.solutionModel.aggregate([
      { $match: { kind } },
      { $group: { _id: '$type' } },
      { $project: { _id: 0, type: '$_id' } },
    ]);
    return distinctTypes;
  }

  private formatDistinctTypes(distinctTypes: { type: string }[]): string[] {
    return distinctTypes.map(({ type }) => type);
  }

  async getDistinctKinds(): Promise<string[]> {
    try {
      const distinctKinds = await this.getDistinctKindsFromDB();
      return this.formatDistinctKinds(distinctKinds);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching and formatting distinct kinds',
      );
    }
  }

  private async getDistinctKindsFromDB(): Promise<{ kind: string }[]> {
    const distinctKinds = await this.solutionModel.aggregate([
      { $group: { _id: '$kind' } },
      { $project: { _id: 0, kind: '$_id' } },
    ]);
    return distinctKinds;
  }

  private formatDistinctKinds(distinctKinds: { kind: string }[]): string[] {
    return distinctKinds.map(({ kind }) => kind);
  }
}
