import {isAxiosError} from 'axios';
import {ILoginAdmin} from "../types/Auth.ts";
import api from "../lib/interceptor.ts";

export const loginAdmin = async (email: string, password: string): Promise<ILoginAdmin | undefined> => {
     try {
             const data = {
                 email: email,
                 password: password,
             }
             const response = await api.post('auth/login/admin', data);
             return response.data;
         } catch (error) {
         if(isAxiosError(error)) {
             return error.response?.data
         }
     }


};

export const loginPatient = async (patientCpf: string, password: string): Promise<ILoginAdmin | undefined> => {
    try {
        const data = {
            cpf: patientCpf,
            password: password
        }
        const response = await api.post('/api/v1/auth/login/patient', data);
        return response.data;
    } catch (error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
};