import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStockDto } from './dto/create-stock-dto';
import { ProductRepository } from './product.repository';
import * as fsExtra from 'fs-extra';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}
  createProduct(createStockDto: CreateStockDto) {
    return this.productRepository.createProduct(createStockDto);
  }
  getProducts(keyword: string) {
    if (keyword) {
      const query = this.productRepository.createQueryBuilder('product');
      query.andWhere('product.name LIKE :keyword', { keyword: `%${keyword}%` });
      return query.getMany();
    } else {
      return this.productRepository.find();
    }
  }
  async getProductById(id: number) {
    const found = await this.productRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Product ${id} is not found!`);
    }

    return found;
  }

  async deleteProduct(id: number) {
    const found = await this.getProductById(id);
    const { image } = found;
    await fsExtra.remove(`upload/${image}`);
    return await this, this.productRepository.delete(id);
  }

  async updateProduct(id: number, CreateStockDto: CreateStockDto) {
    const product = await this.getProductById(id);
    const { name, price, stock } = CreateStockDto;
    product.name = name;
    product.stock = stock;
    product.price = price;
    await product.save();
    return product;
  }
}
