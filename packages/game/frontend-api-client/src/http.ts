import config from './config';

export const request = async (path: string, options: RequestInit = {}): Promise<Response> => {
  return fetch(`${config.BACKEND_URL}${path}`, options);
};
