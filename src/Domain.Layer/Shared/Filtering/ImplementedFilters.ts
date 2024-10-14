import { FilterParameters } from "../Models/FilterParameters.model";
import { Product } from "../../Entities/Product.model";
import { propertyOf } from "../Others/Functions";

export const filters: FilterParameters[] = [
    {
        displaytext: "10$-50$",
        propertyname: propertyOf<Product>('price'),
        valuefrom: '10',
        valueto: '50'        
    },
    {
        displaytext: "50$-100$",
        propertyname: propertyOf<Product>('price'),
        valuefrom: '50',
        valueto: '100'        
    },
    {
        displaytext: "100$ +",
        propertyname: propertyOf<Product>('price'),
        valuefrom: '50',
        valueto: '9999999'        
    }
];

