import axios from "axios";
import { RequestDto } from "./app/app";

const axiosInstance = axios.create({
  baseURL: '/api'
});

export const taskApi = {
  create: async (entity: RequestDto) => {
    const response = await axiosInstance.post('/onboarding', entity)
    return response.status;
  },
}