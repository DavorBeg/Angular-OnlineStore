import { Product } from "../../../Entities/Product.model";

export interface ProductsDto {
    products: Product[];
    skip: number,
    total: number,
    limit: number

}