import { FilterParameters } from "../Models/FilterParameters.model";
import { Product } from "../../Entities/Product.model";
import { propertyOf } from "../Others/Functions";

export const filters: FilterParameters[] = [
    {
        displayText: "10$-50$",
        propertyName: propertyOf<Product>('price'),
        valueFrom: '10',
        valueTo: '50'        
    },
    {
        displayText: "50$-100$",
        propertyName: propertyOf<Product>('price'),
        valueFrom: '50',
        valueTo: '100'        
    },
    {
        displayText: "100$ +",
        propertyName: propertyOf<Product>('price'),
        valueFrom: '50',
        valueTo: '9999999'        
    }
];

