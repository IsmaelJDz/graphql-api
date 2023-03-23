import {
  CreateProductInput,
  ProductModel,
} from '../schema/product.schema';
import { User } from '../schema/user.schema';
import { GetProductInput } from '../schema/product.schema';

class ProductService {
  /* constructor(private readonly productRepository: ProductRepository) {} */

  // async createProduct(
  //   product: CreateProductInput & { user: User['_id'] }
  // ): Promise<CreateProductInput> {
  //   return ProductModel.create(product);
  // }

  async createProduct(
    product: CreateProductInput & { user: User['_id'] }
  ) {
    return ProductModel.create(product);
  }

  async findProducts() {
    return ProductModel.find().lean();
  }

  async findSingleProduct(input: GetProductInput) {
    return ProductModel.findOne(input).lean();
  }

  /* async updateProduct(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  } */
}

export default ProductService;
