import { Filters } from 'src/types/Filters';
import { Service } from 'src/types/Service';
import { fetchAndCache } from './fetchAndCache';

export const fetchServices = async (filters?: Filters) => {
  const servicesResponse = await fetchAndCache('/services.json');
  const servicesJson = (await servicesResponse.json()) as Service[];

  const filterName = filters?.search;
  if (!filterName) return servicesJson;

  return servicesJson.filter((service) =>
    service.name.toLowerCase().includes(filterName.trim().toLowerCase()),
  );
};
