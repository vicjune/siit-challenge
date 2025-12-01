export interface Service {
  id: number;
  name: string;
  logo_url: string;
  website_url: string;
  price: {
    cost_per_user: number;
    flat_cost: number;
    nb_users_included: number;
  };
}
