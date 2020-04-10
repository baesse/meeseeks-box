const isAuthenticated = `
import { GET } from "utils/helpers/localStorage";

const isAuthenticated = () => {
  const { token } = GET("access-token");
  if (token) return true;
  return false;
};

export default isAuthenticated;

`
module.exports.isAuthenticated = isAuthenticated
