export const getUniqueId = () => {
  return `${new Date().getTime().toString(16)}-${Math.floor(1_0000 * Math.random()).toString(16)}`;
};
