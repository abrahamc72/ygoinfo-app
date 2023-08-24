import React, { lazy, Suspense } from 'react';

const LazyVersus = lazy(() => import('./Versus'));

const Versus = props => (
  <Suspense fallback={null}>
    <LazyVersus {...props} />
  </Suspense>
);

export default Versus;
