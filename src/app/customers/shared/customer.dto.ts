export interface CreateCustomerDTO {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone?: string;
  birth_date?: string;
}

export interface UpdateCustomerDTO {
  first_name?: string;
  last_name?: string;
  phone?: string;
  birth_date?: string;
}