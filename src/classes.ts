export interface Setting {
  address: string;
  banner: string;
  banner_shade: string[];
  city: string;
  description: string;
  slogan: string;
  domain_id: string;
  email: string;
  id: number;
  logo: string;
  phone: string;
  profile: string;
  restaurant_name: string;
  theme: string[];
}

export class Setting implements Setting {
  constructor(
    public address: string,
    public banner: string,
    public banner_shade: string[],
    public city: string,
    public description: string,
    public slogan: string,
    public domain_id: string,
    public email: string,
    public id: number,
    public logo: string,
    public phone: string,
    public profile: string,
    public restaurant_name: string,
    public theme: string[]
  ) {}
}
export interface Staff {
  id: number;
  address: string;
  domain_id: number;
  father_name: string;
  joining_date: string;
  manager: string;
  national_identity: string;
  position: string;
  salary: string;
  shift: string;
  user: User;
  zipcode: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  domain_id: number;
  image: string;
  position: string;
  user_id: number;
}
export class Staff implements Staff {
  constructor(
    public id: number,
    public address: string,
    public domain_id: number,
    public father_name: string,
    public joining_date: string,
    public manager: string,
    public national_identity: string,
    public position: string,
    public salary: string,
    public shift: string,
    public user: User,
    public zipcode: string,
  ) {}
}

export class User implements User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public dob: string,
    public domain_id: number,
    public image: string,
    public position: string,
    public user_id: number,
  ) {}
}
