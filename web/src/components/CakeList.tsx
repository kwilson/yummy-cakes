import * as React from 'react';
import { Cake } from '../models/Cake';

export interface CakeListStateProps {
  cakes: Cake[];
  isLoading: boolean;
}

export interface CakeListDispatchProps {
  selectCake: (id: string) => any;
}

const CakeList: React.StatelessComponent<CakeListStateProps & CakeListDispatchProps> = props => {
  const cakes = props.cakes.map(x => {
    const onClick = () => props.selectCake(x.id);
    return (
      <p onClick={onClick} key={x.id}>
        {x.name}
      </p>
    );
  });

  return <div>{cakes}</div>;
};

export default CakeList;
