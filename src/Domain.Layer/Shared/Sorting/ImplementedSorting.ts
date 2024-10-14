import { Product } from "../../Entities/Product.model";
import { sortBy } from "../Enums/SortBy.enum";
import { SortingParameters } from "../Models/SortingParameters.model";
import { propertyOf } from "../Others/Functions";

export const sorting: SortingParameters[] = [
    {
        displaytext: 'Price Low To High',
        propertyname: propertyOf<Product>('price'),
        sortby: sortBy.DESCENDING
    },
    {
        displaytext: 'Price High to Low',
        propertyname: propertyOf<Product>('price'),
        sortby: sortBy.ASCENDING
    },
    {
        displaytext: 'From A to Z',
        propertyname: propertyOf<Product>('title'),
        sortby: sortBy.DESCENDING
    },
    {
        displaytext: 'From Z to A',
        propertyname: propertyOf<Product>('title'),
        sortby: sortBy.ASCENDING
    },
];