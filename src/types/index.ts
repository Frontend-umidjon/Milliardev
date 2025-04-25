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
  