import { useSuspenseQuery_experimental as useSuspenseQuery } from '@apollo/client';

import type { GetFeatureSectionsQueryResponse } from '../graphql/queries';
import { GetFeatureSectionsQuery } from '../graphql/queries';

export const useFeatures = () => {
  const { data } = useSuspenseQuery<GetFeatureSectionsQueryResponse>(GetFeatureSectionsQuery);

  return { features: data.features };
};
