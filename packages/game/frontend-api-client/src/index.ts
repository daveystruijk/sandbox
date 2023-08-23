import config from './config';

export const getIndex = async () => {
  const url = `${config.BACKEND_URL}/`;
  console.log(`Getting ${url}`);
  const result = await fetch(url);
  return result;
};
