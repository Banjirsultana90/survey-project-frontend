import axios from 'axios';
export const axiosPublic=axios.create({
    baseURL:'https://survey-project-server-xi.vercel.app/'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;
