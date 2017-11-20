import * as React from 'react';

export interface YumFactorStateProps {
  value: number;
}

const YumFactor: React.StatelessComponent<YumFactorStateProps> = (props) => {
  return (
    <p>YUM: {props.value}</p>
  );
};

export default YumFactor;
