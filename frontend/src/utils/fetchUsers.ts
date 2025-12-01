import { Filters } from 'src/types/Filters';
import { User } from 'src/types/User';
import { fetchAndCache } from './fetchAndCache';

export const fetchUsers = async (filters?: Filters) => {
  const params = new URLSearchParams();
  if (filters?.service) {
    params.append('service_id', String(filters.service));
  }

  const response = await fetchAndCache(`/users.json?${params.toString()}`);
  const resultJson = (await response.json()) as User[];

  const filterName = filters?.search;
  if (!filterName) return resultJson;

  return resultJson.filter((user) =>
    user.name.toLowerCase().includes(filterName.trim().toLowerCase()),
  );
};
