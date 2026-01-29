import callAPI from '@/utils/fetcher/fetcher';
import { useQuery } from '@tanstack/react-query';

export const useGetSurah = () => {
  return useQuery({
    queryKey: ['useGetSurah'],
    queryFn: async () => {
      const res = await callAPI({
        method: 'GET',
        path: '/v1/quran/surah',
      });
      return res;
    },
  });
};
