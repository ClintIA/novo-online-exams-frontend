import {createContext, useEffect, useState} from "react";
import {IAuthContextType, ILoginAdmin, ITokenPayload, Props} from "../types/Auth.ts";
import {loginAdmin, loginPatient} from "../services/loginService.tsx";
import {jwtDecode} from "jwt-decode";
import Cookies from 'js-cookie';


export const AuthContext = createContext<IAuthContextType>({} as IAuthContextType);

const saveStorage =  (user: ITokenPayload, token: string) => {
    Cookies.set('token', token);
    Cookies.set('user', JSON.stringify(user));
    // Cookies.set('userId', String(userId)); 

    // if (user.userId) {
    //     Cookies.set('userId', String(user.userId)); // Armazene o tenantId se disponível
    // }

}

const AuthProvider = ({ children }: Props) => {
    const [ isAuthenticated, setAuthenticated ] = useState<boolean>(false)
    const [token, setToken] = useState<string>('');
    const [userId, setUserId] = useState<number>();
    useEffect(() => {
        const checkToken = () => {
            const tokenFromStorage = Cookies.get('token');
            const user = Cookies.get('user');
            if (tokenFromStorage && user) {
                setToken(tokenFromStorage);
                const decoded: ITokenPayload = jwtDecode(tokenFromStorage);
                setAuthenticated(decoded.isAdmin);
                setUserId(decoded.userId)
            }
        }
        checkToken()
    },[token])
    const adminLogin = async (email: string,password: string): Promise<ILoginAdmin | undefined> => {
           const res = await loginAdmin(email, password);
           if(res?.status === 'success') {
               if (res?.data?.token) {
                   const decoded: ITokenPayload = jwtDecode(res.data.token) as ITokenPayload;
                   saveStorage(decoded, res.data.token)
                   setToken(res.data.token);


               }
           }
           return res
    };
    const getPatientLogin = async (cpf: string, password: string): Promise<ILoginAdmin | undefined> => {
        const res = await loginPatient(cpf,password);
        if(res?.status === 'success') {
            if (res?.data?.token) {
                const decoded: ITokenPayload = jwtDecode(res.data.token) as ITokenPayload;
                saveStorage(decoded, res.data.token)
                setToken(res.data.token);
                setUserId(decoded.userId);
            }
        }
        return res
    };

    const logOut =  () => {
            Cookies.remove("token")
            Cookies.remove("user")
            setToken('')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, adminLogin, getPatientLogin, logOut, userId }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;