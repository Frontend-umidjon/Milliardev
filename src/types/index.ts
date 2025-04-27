// types/index.ts

export interface Admin {
  _id: string;
  full_name: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  is_creator: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminResponse {
  statusCode: number;
  message: string;
  data: {
    payload: Admin[];
    total: number;
    limit: number;
    page: number;
  };
}

export interface AdminFormValues {
  full_name: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  is_creator?: boolean;
}

export interface CustomerType {
  _id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  tg_id: string;
  lang: "ru" | "uz";
  is_active: boolean;
  createdAt: string;
}

export interface CustomersResponse {
  statusCode: number;
  message: string;
  data: {
    payload: CustomerType[];
    total: number;
    limit: number;
    page: number;
  };
}

export interface ProjectType {
  _id: string;
  name: string;
  description: string;
  link: string;
  image: string;
  customerId: string;
  is_done: boolean;
}

export interface ProjectResponse {
  data: {
    payload: ProjectType[];
  };
}
