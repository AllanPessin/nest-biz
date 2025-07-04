import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { connect } from 'http2';
import { PaginateDto } from 'src/paginate/dto/paginate.dto';
import { PaginateResulteDto } from 'src/paginate/dto/paginateResulta.dto';
import { Products } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { companyId, sku, ...productData } = createProductDto;

    const [companyExists, productExists] = await Promise.all([
      this.prisma.company.findUnique({ where: { id: companyId } }),
      this.prisma.products.findUnique({ where: { sku } }),
    ]);

    if (!companyExists) {
      throw new NotFoundException('Empresa não existe ou não encontrada');
    }

    if (productExists) {
      throw new ConflictException('Já existe um produto com este código.');
    }

    return this.prisma.products.create({
      data: {
        ...productData,
        sku,
        company: {
          connect: { id: companyId },
        },
      },
    });
  }

  async findAll(paginate: PaginateDto): Promise<PaginateResulteDto<Products>> {
    const { page = 1, limit = 10 } = paginate;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.products.findMany({
        skip,
        take: Number(limit),
      }),
      this.prisma.products.count(),
    ]);

    return { data, total, page, limit, lastPage: Math.ceil(total / limit) };
  }

  async findOne(id?: number) {
    const productExists = await this.prisma.products.findFirst({
      where: { id },
    });

    if (!productExists) {
      throw new NotFoundException('Produto não existe ou não encontrada');
    }

    return productExists;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productExists = await this.prisma.products.findFirst({
      where: { id },
    });

    if (!productExists) {
      throw new NotFoundException('Produto não existe ou não encontrada');
    }

    return this.prisma.products.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    const productExists = await this.prisma.products.findFirst({
      where: { id },
    });

    if (!productExists) {
      throw new NotFoundException('Produto não existe ou não encontrada');
    }

    return this.prisma.products.delete({
      where: { id },
    });
  }
}
