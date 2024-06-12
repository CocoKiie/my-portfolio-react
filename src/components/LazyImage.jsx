import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Blurhash } from 'react-blurhash';

const LazyImage = ({ src, alt, blurhash }) => {
  return (
      <LazyLoadImage
        alt={alt}
        src={src}
        placeholder={<Blurhash hash={blurhash} />}
        effect="blur"
      />
  );
};

export default LazyImage;