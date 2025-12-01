export interface UserFilters {
  service?: number;
}

export const buildUserUrl = (filters?: UserFilters) => {
  const params = new URLSearchParams();
  if (filters?.service) {
    params.append('service_id', String(filters.service));
  }
  return `/users.json?${params.toString()}`;
};
