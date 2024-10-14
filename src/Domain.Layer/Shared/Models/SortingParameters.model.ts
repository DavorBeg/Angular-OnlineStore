import { sortBy } from "../Enums/SortBy.enum";

export interface SortingParameters
{
    displaytext: string,
    propertyname: string,
    sortby: sortBy;
}