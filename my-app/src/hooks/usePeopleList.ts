import { useQuery } from '@tanstack/react-query';
import { SwapiService } from '../service/useServiceData';
import { usePaginationStore } from '../constants/usePaginationStore';
import { PeopleProps } from './types';

const peopleService = new SwapiService();

export default function usePeopleData(search?: string) {
    const { page } = usePaginationStore();

    const { data, isLoading } = useQuery<PeopleProps>({
        queryKey: search ? ['people', search] : ['people', page], 
        queryFn: () => peopleService.getPeople(search ? undefined : page, search), 
    });

    return {
        peopleQuery: data,
        loadingPeople: isLoading,
    };
}
