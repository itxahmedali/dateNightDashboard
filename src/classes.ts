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
  mode_id: number;
  modes: [any];
  name: string;
  description: string;
  paid_or_free: string;
  price: string;
  active_status: string;
}
export class Pings implements Pings {
  constructor(
    public id: number,
    public mode_id: number,
    public modes: [any],
    public name: string,
    public description: string,
    public paid_or_free: string,
    public price: string,
    public active_status: string
  ) {}
}
export interface PingsChild {
  id: number;
  category_id: number;
  name: string;
  description: string;
  active_status: string;
}
export class PingsChild implements PingsChild {
  constructor(
    public id: number,
    public category_id: number,
    public name: string,
    public description: string,
    public active_status: string
  ) {}
}
export interface Events {
  id: number;
  name: string;
  active_status: string;
}
export class Events implements Events {
  constructor(
    public id: number,
    public name: string,
    public active_status: string
  ) {}
}
export interface EventChild {
  id: number;
  event_id: number;
  label: string;
  value: string;
  active_status: string;
}
export class EventChild implements EventChild {
  constructor(
    public id: number,
    public event_id: number,
    public label: string,
    public value: string,
    public active_status: string
  ) {}
}
export interface Users {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  image: string;
  dates: [];
  reminders: [];
  active_status: string;
  soft_delete_status: string;
  type: string;
}
export class Users implements Users {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public dob: string,
    public image: string,
    public dates: [],
    public reminders: [],
    public active_status: string,
    public soft_delete_status: string,
    public type: string
  ) {}
}
export interface Faq {
  id: number;
  heading: string;
  paragraph: string;
  active_status: string;
}
export class Faq implements Faq {
  constructor(
    public id: number,
    public heading: string,
    public paragraph: string,
    public active_status: string
  ) {}
}