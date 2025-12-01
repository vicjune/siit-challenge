import { Service } from 'src/types/Service';
import { User } from 'src/types/User';

export interface ServiceWithUsage extends Service {
  nb_of_users: number;
}

export const populateService = (
  service: Service,
  users: User[],
): ServiceWithUsage => ({
  ...service,
  nb_of_users: users.filter((user) => user.service_ids.includes(service.id))
    .length,
});
