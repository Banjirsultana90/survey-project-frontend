
import { useContext } from "react";
import { AuthContext } from "../components/provider/AuthProvider"
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../components/base/Useaxiossecure";

const useSurveyor = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: [user?.email, 'isSurveyor'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/alluser/surveyor/${user.email}`, { withCredentials: true });
            return res.data;
        }
    });

    return [data?.surveyor, isLoading];
};

export default useSurveyor;

// import { useContext } from "react";
// import { AuthContext } from "../components/provider/AuthProvider"
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../components/base/Useaxiossecure";

// const useSurveyor = () => {
//     const { user,loading } = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();

//     const { data:isSurveyor, isPending:isSurveyorLoading } = useQuery({
//         queryKey: [user?.email, 'isSurveyor'],
//         enabled:!loading,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/alluser/surveyor/${user.email}`, { withCredentials: true });
//             return res.data?.surveyor;
//         }
//     });

//     return [isSurveyor,isSurveyorLoading];
// };

// export default useSurveyor;