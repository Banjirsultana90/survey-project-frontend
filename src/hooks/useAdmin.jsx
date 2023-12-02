
import { useContext } from "react";
import { AuthContext } from "../components/provider/AuthProvider"
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../components/base/Useaxiossecure";

const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/alluser/admin/${user.email}`, { withCredentials: true });
            return res.data;
        }
    });

    return [data?.admin, isLoading];
};

export default useAdmin;
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../components/base/Useaxiossecure";

// const useAdmin = () => {
//     const { user,loading } = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();

//     const { data:isAdmin,isPending:isAdminLoading } = useQuery({
//         queryKey: [user?.email, 'isAdmin'],
//         enabled:!loading,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/alluser/admin/${user.email}`, { withCredentials: true });
//             return res.data;
//         }
//     });

//     return [isAdmin, isAdminLoading];
// };

// export default useAdmin;