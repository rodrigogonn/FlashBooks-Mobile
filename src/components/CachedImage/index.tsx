import React, { useEffect, useState } from 'react';
import { Image, ImageProps } from 'react-native';
import { getCachedImageUri } from 'utils/imageCache';

export interface CachedImageProps extends Omit<ImageProps, 'source'> {
  source: { uri: string };
}

export const CachedImage: React.FC<CachedImageProps> = ({
  source,
  ...rest
}) => {
  const [resolvedUri, setResolvedUri] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setResolvedUri(null);
    (async () => {
      try {
        const local = await getCachedImageUri(source.uri);
        if (isMounted) setResolvedUri(local);
      } catch {
        if (isMounted) setResolvedUri(source.uri);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [source.uri]);

  return <Image {...rest} source={{ uri: resolvedUri || undefined }} />;
};
