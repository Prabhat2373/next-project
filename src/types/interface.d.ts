export interface User {
  avatar: Avatar;
  billing_info: BillingInfo;
  role: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  __v: number;
}

export interface Avatar {
  public_id: string;
  url: string;
}

export interface BillingInfo {
  billing_first_name: string;
  billing_last_name: any;
  billing_email: string;
  billing_phone: string;
  billing_address_line1: string;
  billing_address_line2: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  billing_country: string;
}
