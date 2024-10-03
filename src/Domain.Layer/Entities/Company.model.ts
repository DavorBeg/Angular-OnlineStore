import { Address } from "./Entities.model";

export interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
  }