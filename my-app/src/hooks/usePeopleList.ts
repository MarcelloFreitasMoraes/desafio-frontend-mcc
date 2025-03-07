import { useQuery } from '@tanstack/react-query';
import { SwapiService } from '../service/useServiceData';
import { usePaginationStore } from '../constants/usePaginationStore';

const dataService = new SwapiService();

export default function useData(endpoint: string, search?: string) {
    const { page } = usePaginationStore();

    const { data, isLoading } = useQuery({
        queryKey: search ? [endpoint, search] : [endpoint, page], 
        queryFn: () => dataService.getSwapi(endpoint, search ? undefined : page, search), 
    });

    return {
        query: data,
        loading: isLoading,
    };
}
