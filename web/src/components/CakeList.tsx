import * as React from 'react';
import Cake from './Cake';
import { CakeModel } from '../models/CakeModel';

import './CakeList.css';

export interface CakeListStateProps {
  cakes: CakeModel[];
  isLoading: boolean;
}

export interface CakeListDispatchProps {
  selectCake: (id: string) => any;
}

const CakeList: React.StatelessComponent<CakeListStateProps & CakeListDispatchProps> = props => {
  const cakes = props.cakes.map(x => {
    const onClick = () => props.selectCake(x.id);
    return (
      <li key={x.id} className="cake-wrapper">
        <Cake
          cake={x}
          selectCake={onClick}
        />
      </li>
    );
  });

  return <ul className="cake-list">{cakes}</ul>;
};

export default CakeList;
