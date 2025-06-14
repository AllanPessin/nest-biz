import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(CompaniesService.name);

  async create(createCompanyDto: CreateCompanyDto) {
    const companyExists = await this.prisma.company.findUnique({
      where: { cnpj: createCompanyDto.cnpj },
    });

    if (companyExists) {
      throw new ConflictException('Já existe uma empresa com este CNPJ.');
    }

    return this.prisma.company.create({
      data: createCompanyDto,
    });
  }

  findAll() {
    return this.prisma.company.findMany();
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findFirst({
      where: { id: id },
    });

    if (!company) {
      throw new NotFoundException('Empresa não existe ou não encontrada.');
    }

    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const companyExists = await this.prisma.company.findFirst({
      where: { id },
    });

    if (!companyExists) {
      throw new NotFoundException('Empresa não existe ou não encontrada.');
    }

    if (updateCompanyDto.cnpj && updateCompanyDto.cnpj != companyExists?.cnpj) {
      throw new ConflictException('Cnpj não pode ser alterado.');
    }

    const { cnpj, ...updateData } = updateCompanyDto;

    return this.prisma.company.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    const companyExists = await this.prisma.company.findFirst({
      where: { id },
    });

    if (!companyExists) {
      throw new NotFoundException('Empresa não existe ou não encontrada.');
    }

    this.logger.log(`Empresa excluída: ${id}`);

    return this.prisma.company.delete({
      where: { id },
    });
  }
}
