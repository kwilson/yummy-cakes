import * as React from 'react';
import './YumFactor.css';

export interface YumFactorStateProps {
  value?: number;
}

const YumFactor: React.StatelessComponent<YumFactorStateProps> = ({ value }) => {
  if (!value) {
    return null;
  }

  const ratingLabel = `${value} out of 5`;
  const stars = '★★★★★☆☆☆☆☆'.substr(5 - value, 5);

  return (
    <div className="yum-factor">
      Yum Factor
      
      <div className="yum-factor__rating" title={ratingLabel} aria-label={ratingLabel}>
        {stars}
      </div>
    </div>
  );
};

export default YumFactor;
