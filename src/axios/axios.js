import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

const expiredAuthCodes = [401, 403, 405, 302];

instance.interceptors.response.use(
  (response) => {
    if (response.status === 302) {
      window.location.assign(
        `/auth/user/login/?next=${window.location.pathname}`,
      );
    }
    return response;
  },
  function (error) {
    const status = error?.response?.status;
    window.location.assign(
      `/auth/user/login/?next=${window.location.pathname}`,
    );
    console.log(error, "error fetching");
    if (status === 405 || status === 401 || status === 403) {
      window.location.assign(
        `/auth/user/login/?next=${window.location.pathname}`,
      );
    }
  },
);

export default instance;
