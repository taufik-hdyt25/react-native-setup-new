import callAPI from '@/utils/fetcher/fetcher';

export const getBeritaAntara = async () => {
  try {
    const resp = callAPI({
      method: 'GET',
      path: `/`,
    });

    console.log(resp);

    return resp;
  } catch (error) {
    console.log(error);
  }
};
