import { ServiceWithUsage } from './populateService';

export const calculateServicePrice = (service: ServiceWithUsage) =>
  service.price.flat_cost +
  service.price.cost_per_user *
    Math.max(service.nb_of_users - service.price.nb_users_included, 0);
