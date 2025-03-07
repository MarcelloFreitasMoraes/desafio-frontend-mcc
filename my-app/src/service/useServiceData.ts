import { http } from "./https"

export class SwapiService {
    async getSwapi(endpoint: string, page?: number, search?: string) {
        const params: Record<string, string | number> = {};
        
        if (search) {
            params.search = search; 
        } else if (page) {
            params.page = page; 
        }

        const { data } = await http.get(`${endpoint}`, { params });
        return data;
    }
}