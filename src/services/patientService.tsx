import {isAxiosError} from 'axios';
import api from "../lib/interceptor.ts";
import { GetPatientExamsResponse } from '../types/Patient.ts';


export const patientExams = async(patientId: number): Promise<GetPatientExamsResponse | undefined> => {
    try{
        const response = await api.get(`/patientExams`, {
            params: { patientId },

        });
        return response.data;

    } catch (error) {
        if(isAxiosError(error)) {
            return error.response?.data
        }
    }
};