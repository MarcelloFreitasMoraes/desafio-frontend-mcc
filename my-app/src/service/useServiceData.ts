import { http } from "./https"

export class SwapiService {
    async getPeople(page?: number, search?: string) {
        const params: Record<string, string | number> = {};
        
        if (search) {
            params.search = search; // Se houver busca, não enviar page
        } else if (page) {
            params.page = page; // Se não houver busca, enviar paginação
        }

        const { data } = await http.get(`/people/`, { params });
        return data;
    }

    // async getSpecies(id?: string | undefined) {
    //     const { data } = await http.get(`/species/:id/${id}`)
    //     return data
    // }

    // async getFilms(id?: string | undefined) {
    //     const { data } = await http.get(`/films/${id}`)
    //     return data
    // }
}