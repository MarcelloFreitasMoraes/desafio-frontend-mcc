import { useQuery } from '@tanstack/react-query';
import { SwapiService } from '../service/useServiceData';
import { usePaginationStore } from '../constants/usePaginationStore';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const dataService = new SwapiService();

export default function useData(endpoint: string, search?: string) {
    const { page, setPage } = usePaginationStore();
    const location = useLocation();

    useEffect(() => {
        setPage(1);
    }, [location.pathname])

    const { data, isLoading } = useQuery({
        queryKey: search ? [endpoint, search] : [endpoint, page], 
        queryFn: () => dataService.getSwapi(endpoint, search ? undefined : page, search), 
    });

    return {
        query: data,
        loading: isLoading,
    };
}
