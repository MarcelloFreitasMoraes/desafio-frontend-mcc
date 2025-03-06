import { useQuery } from '@tanstack/react-query'
import { SwapiService } from '../service/useServiceData'

const swapiService = new SwapiService()

export default function useFilmsData(id?: string) {
    const { data, isLoading } = useQuery<any>({
        queryKey: ['films', id],
        queryFn: ({ queryKey }: { queryKey: [string, string | undefined] }) => swapiService.getFilms(queryKey[1]),
        enabled: !!id,
    })

    return {
        filmsQuery: data,
        loadingFilms: isLoading,
    }
}