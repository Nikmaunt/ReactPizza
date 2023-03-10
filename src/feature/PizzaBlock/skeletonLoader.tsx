import React from 'react';
import ContentLoader from 'react-content-loader';

export const SkeletonLoader = (props: any) => {
  return (
    <ContentLoader
      className='pizza-block'
      speed={2}
      width={280}
      height={460}
      viewBox='0 0 280 460'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      {...props}
    >
      <circle cx='135' cy='150' r='115' />
      <rect x='159' y='405' rx='0' ry='0' width='0' height='4' />
      <rect x='3' y='279' rx='0' ry='0' width='280' height='20' />
      <rect x='-4' y='310' rx='0' ry='0' width='280' height='88' />
      <rect x='0' y='409' rx='10' ry='10' width='90' height='25' />
      <rect x='153' y='406' rx='10' ry='10' width='122' height='38' />
    </ContentLoader>
  );
};
