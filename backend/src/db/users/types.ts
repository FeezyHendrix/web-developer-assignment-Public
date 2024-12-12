export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: string;
  phone: string;
}

export interface IAllUser extends User {
  address_id: number;
  street: string;
  state: string;
  city: string;
  zipcode: number;
}
