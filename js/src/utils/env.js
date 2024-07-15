export const getApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL;

export const getImageUrl = (path) => {
  return path ? `${getApiBaseUrl()}${path}` : "";
};
