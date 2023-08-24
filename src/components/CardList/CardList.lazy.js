import React, { lazy, Suspense } from 'react';

const LazyCardList = lazy(() => import('./CardList'));

const CardList = props => (
  <Suspense fallback={null}>
    <LazyCardList {...props} />
  </Suspense>
);

export default CardList;
