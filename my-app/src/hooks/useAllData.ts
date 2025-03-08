import { useQuery } from '@tanstack/react-query';
import { SwapiService } from '../service/useServiceData';

const dataService = new SwapiService();

export default function useAllData(id?: string) {

    const { data: AllData, isLoading: loadingAllData} = useQuery({
        queryKey: ["all", id],
        queryFn: async () => {
            if (!id) return null;
            const character = await dataService.getSwapi(`/people/${id}`);

            const [films, species] = await Promise.all([
                Promise.all(character.films.map((url: string) => dataService.getSwapi(url))),
                Promise.all(character.species.map((url: string) => dataService.getSwapi(url))),
            ]);

            return { character, films, species };
        },
        enabled: !!id 
    });

    return { 
        AllData,
        loadingAllData
    };
}
