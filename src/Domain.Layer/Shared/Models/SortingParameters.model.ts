import { sortBy } from "../Enums/SortBy.enum";

export interface SortingParameters
{
    displayText: string,
    propertyName: string,
    sortBy: sortBy;
}