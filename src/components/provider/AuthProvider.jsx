import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
// eslint-disable-next-line no-unused-vars
import  { createContext, useEffect, useState } from 'react';

// import axios from 'axios';
import auth from '../firebase/firebaseconfig';
import axios from 'axios';

import useAxiosPublic, { axiosPublic } from '../base/useAxiosPublic';



export const AuthContext = createContext(null)



const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)
    const googleprovider = new GoogleAuthProvider()
    const axiosPublic=useAxiosPublic()


    const googlelogin = () => {
        setloading(true)

        return signInWithPopup(auth, googleprovider)
    }
    const createuser = (email, password) => {
        setloading(true)

        return createUserWithEmailAndPassword(auth,email,password)
    }

    const handleupdateprofile = (name, photo) => {
        setloading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })

    }
    const signin = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setloading(true)
        return signOut(auth)
    }

  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            const userEmail = currentuser?.email;
                const loggeduser = { email: userEmail };
            setuser(currentuser);

            console.log('user in the auth state changed', currentuser);
            setloading(false);
    
            if (currentuser) {
                axiosPublic.post('/jwt', loggeduser, { withCredentials: true })
                    .then((res) => {
                        console.log(res.data);
                    });
                    setloading(false)
            } 
            else {
                axiosPublic.post('/logout', loggeduser, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        console.log(res.data);
                    });
                    setloading(false)
            }
        });
    
        return () => {
            unsubscribe();
        };
    }, []);
    
    const authinfo = {
        googlelogin,
        createuser, user, loading, handleupdateprofile, signin, logout
    }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;