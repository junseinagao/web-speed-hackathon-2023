import type { FC } from 'react';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';
import { ProductList } from '../../components/feature/ProductList';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useFeatures } from '../../hooks/useFeatures';

import * as styles from './Top.styles';

const Features = () => {
  const { features } = useFeatures();
  return (
    <div className={styles.featureList}>
      {features.map((featureSection) => {
        return (
          <div key={featureSection.id} className={styles.feature}>
            <h2 className={styles.featureHeading}>{featureSection.title}</h2>
            <ProductList featureSection={featureSection} />
          </div>
        );
      })}
    </div>
  );
};

export const Top: FC = () => {
  const { features } = useFeatures();

  if (features === undefined) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
      </Helmet>
      <Layout>
        <div>
          <Suspense fallback={<div>loading...</div>}>
            <ProductHeroImage title="今週のオススメ" />
          </Suspense>
          <Suspense fallback={<div>loading...</div>}>
            <Features />
          </Suspense>
        </div>
      </Layout>
    </>
  );
};
