import { useSuspenseQuery_experimental as useSuspenseQuery } from '@apollo/client';

import type { GetRecommendationsQueryResponse } from '../graphql/queries';
import { GetRecommendationsQuery } from '../graphql/queries';

export const useRecommendation = () => {
  const { data } = useSuspenseQuery<GetRecommendationsQueryResponse>(GetRecommendationsQuery);

  const hour = window.Temporal.Now.plainTimeISO().hour;
  const recommendation = data.recommendations[hour % data.recommendations.length];
  return { recommendation };
};
