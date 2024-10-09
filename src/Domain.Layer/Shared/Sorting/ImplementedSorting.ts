import { Product } from "../../Entities/Product.model";
import { sortBy } from "../Enums/SortBy.enum";
import { SortingParameters } from "../Models/SortingParameters.model";
import { propertyOf } from "../Others/Functions";

export const sorting: SortingParameters[] = [
    {
        displayText: 'Highest to lowest price',
        propertyName: propertyOf<Product>('price'),
        sortBy: sortBy.DESCENDING
    },
    {
        displayText: 'Lowest to highest price',
        propertyName: propertyOf<Product>('price'),
        sortBy: sortBy.ASCENDING
    },
    {
        displayText: 'From A to Z',
        propertyName: propertyOf<Product>('title'),
        sortBy: sortBy.DESCENDING
    },
    {
        displayText: 'From Z to A',
        propertyName: propertyOf<Product>('title'),
        sortBy: sortBy.ASCENDING
    },
];