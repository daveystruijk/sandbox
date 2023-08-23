import { request } from './http';

export const getIndex = async () => {
  const result = await request('/');
  return result.json();
};
