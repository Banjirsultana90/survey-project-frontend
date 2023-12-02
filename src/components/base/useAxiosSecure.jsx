

import axios from "axios";

export const axiosSecure=axios.create(
    {
        baseURL:'https://survey-project-server-xi.vercel.app/'
    }
)
const useAxiosSecure = () => {
  return axiosSecure
};

export default useAxiosSecure;
