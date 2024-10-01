import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import { userLoggedIn } from "../../features/auth/authSlice";

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);
 
    useEffect(() => {
        const cookieAuth = Cookies.get("token");
        const localStorageUser = localStorage.getItem("user");

        if (cookieAuth && localStorageUser) {
            const auth = JSON.parse(cookieAuth);
            const user = JSON.parse(localStorageUser);
            
            if (auth?.accessToken && user) {
                dispatch(
                    userLoggedIn({
                        accessToken: auth.accessToken,
                        user: user,
                    })
                );
            }
        }
        setAuthChecked(true);
    }, [dispatch]);

    return authChecked;
}
