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

interface IControl {
  group: string;
  type: string;
  control?: string;
  code?: string;
}

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
        throw new BadRequestException(`An error has occurred`);
      else
        throw new InternalServerErrorException(
          `Can't create field - Check logs`,
        );
    }
  }

  async byId(id: string) {
    const solution = await this.solutionModel.findById(id);
    if (!solution) throw new NotFoundException(`Data not found`);
    return solution;
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

  private formatDistinctTypes(distinctTypes: { type: string }[]): string[] {
    return distinctTypes.map(({ type }) => type);
  }

  async getDistinctGroups(): Promise<string[]> {
    try {
      const distinctGroups = await this.getDistinctGroupsFromDB();
      return this.formatDistinctGroups(distinctGroups);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching and formatting distinct groups',
      );
    }
  }

  async getDistinctTypesByGroup(group: string): Promise<string[]> {
    try {
      const distinctTypes = await this.getDistinctTypesByGroupFromDB(group);
      return this.formatDistinctTypes(distinctTypes);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching and formatting distinct types by group',
      );
    }
  }

  private async getCodesByGroupAndTypeFromDB(
    query: IControl,
  ): Promise<string[]> {
    const codes = await this.solutionModel.find(query).distinct('code').exec();
    return codes;
  }

  async getCodesByGroupAndType(
    group: string,
    type: string,
    control?: string,
  ): Promise<string[]> {
    try {
      const query: IControl = { group, type };
      if (control) {
        query.control = control;
      }
      const codes = await this.getCodesByGroupAndTypeFromDB(query);
      return codes;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching codes by group and type',
      );
    }
  }

  private async getDistinctTypesByGroupFromDB(
    group: string,
  ): Promise<{ type: string }[]> {
    const distinctTypes = await this.solutionModel
      .find({ group })
      .distinct('type')
      .exec();
    return distinctTypes.map((type) => ({ type }));
  }

  async getSolutionsByGroupTypeAndCode(
    group: string,
    type: string,
    code: string,
    control?: string,
  ): Promise<Solution[]> {
    try {
      const query: IControl = { group, type, code };
      if (control) {
        query.control = control;
      }

      const solutions = await this.getSolutionsByGroupTypeAndCodeFromDB(query);
      return solutions;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching solutions by group, type, and code',
      );
    }
  }

  private async getSolutionsByGroupTypeAndCodeFromDB(
    query: IControl,
  ): Promise<Solution[]> {
    const solutions = await this.solutionModel
      .find(query)
      .sort({ order: 1 })
      .exec();
    return solutions;
  }

  private async getDistinctGroupsFromDB(): Promise<{ group: string }[]> {
    const distinctGroups = await this.solutionModel.aggregate([
      { $group: { _id: '$group' } },
      { $project: { _id: 0, group: '$_id' } },
    ]);
    return distinctGroups;
  }

  private formatDistinctGroups(distinctGroups: { group: string }[]): string[] {
    return distinctGroups.map(({ group }) => group);
  }
}
