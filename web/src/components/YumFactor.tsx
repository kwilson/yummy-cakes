import * as React from 'react';
import './YumFactor.css';

export interface YumFactorStateProps {
  value: number;
}

const YumFactor: React.StatelessComponent<YumFactorStateProps> = (props) => {
  const ratingLabel = `${props.value} out of 5`;
  const stars = '☆☆☆☆☆'.substr(0, props.value);

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
