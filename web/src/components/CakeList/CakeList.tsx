import * as React from 'react';

import { Cake } from '../';
import { CakeModel } from '../../models/CakeModel';

import './CakeList.css';

export interface CakeListProps {
  cakes: CakeModel[];
  onSelectCake: (id: string) => any;
}

const CakeList: React.StatelessComponent<CakeListProps> = props => {
  const getCakes = (cakes: CakeModel[]) => cakes.map(x => {
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

  if (!props.cakes || props.cakes.length < 1) {
    return (
      <div className="cake-list--empty">No cakes to view</div>
    );
  }

  return (
    <ul className="cake-list">
      {getCakes(props.cakes)}
    </ul>
  );
};

export default CakeList;
