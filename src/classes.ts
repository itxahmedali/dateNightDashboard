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
export interface DateMode {
  id: number;
  name: string;
  description: string;
  active_status: string;
}
export class DateMode implements DateMode {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public active_status: string
  ) {}
}
export interface Pings {
  id: number;
  category_id: number;
  name: string;
  description: string;
  paid_or_free: string;
  price: string;
  active_status: string;
}
export class Pings implements Pings {
  constructor(
    public id: number,
    public category_id: number,
    public name: string,
    public description: string,
    public paid_or_free: string,
    public price: string,
    public active_status: string
  ) {}
}
