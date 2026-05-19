export const generateUUID = () => {
  return crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random();
};