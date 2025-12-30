export const getUniqueId = () => {
  return `${Date.now().toString(16)}-${Math.floor(1_0000 * Math.random()).toString(16)}`;
};
