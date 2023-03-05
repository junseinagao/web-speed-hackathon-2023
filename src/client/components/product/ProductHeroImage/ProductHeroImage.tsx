import classNames from 'classnames';
import { memo } from 'react';
import type { FC } from 'react';

import { useRecommendation } from '../../../hooks/useRecommendation';
import { Anchor } from '../../foundation/Anchor';
import { AspectRatio } from '../../foundation/AspectRatio';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { WidthRestriction } from '../../foundation/WidthRestriction';

import * as styles from './ProductHeroImage.styles';

type Props = {
  title: string;
};

export const ProductHeroImage: FC<Props> = memo(({ title }) => {
  const { recommendation } = useRecommendation();
  const thumbnailFile = recommendation.product.media.find((productMedia) => productMedia.isThumbnail)?.file;

  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <WidthRestriction>
            <Anchor href={`/product/${recommendation.product.id}`}>
              <div className={styles.container}>
                <AspectRatio ratioHeight={9} ratioWidth={16}>
                  <img
                    className={styles.image}
                    loading="lazy"
                    src={
                      thumbnailFile?.filename ??
                      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                    }
                  />
                </AspectRatio>

                <div className={styles.overlay}>
                  <p
                    className={classNames(styles.title, {
                      [styles.title__desktop]: deviceType === DeviceType.DESKTOP,
                      [styles.title__mobile]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    {title}
                  </p>
                  <p
                    className={classNames(styles.description, {
                      [styles.description__desktop]: deviceType === DeviceType.DESKTOP,
                      [styles.description__mobile]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    {recommendation.product.name}
                  </p>
                </div>
              </div>
            </Anchor>
          </WidthRestriction>
        );
      }}
    </GetDeviceType>
  );
});

ProductHeroImage.displayName = 'ProductHeroImage';
