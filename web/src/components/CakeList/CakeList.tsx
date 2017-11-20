import * as React from 'react';

import { Cake } from '../';
import { CakeModel } from '../../models/CakeModel';

import './CakeList.css';

export interface CakeListProps {
  cakes: CakeModel[];
  onSelectCake: (id: string) => any;
}

const CakeList: React.StatelessComponent<CakeListProps> = props => {
  const cakes = props.cakes.map(x => {
    const onClick = () => props.onSelectCake(x.id);

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
