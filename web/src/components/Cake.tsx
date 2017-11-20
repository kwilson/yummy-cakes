import * as React from 'react';
import { CakeModel } from '../models/CakeModel';

import './Cake.css';

export interface CakeProps {
  cake: CakeModel;
  selectCake: () => any;
}

const Cake: React.StatelessComponent<CakeProps> = ({ cake, selectCake }) => {
  const onClick = () => selectCake();

  const style: React.CSSProperties = {
    backgroundImage: `url(${cake.imageUrl})`
  };

  const details = cake.name
    ? (
      <div className="cake__details">
        {cake.name}
      </div>
    )
    : null;

  return (
    <button className="cake" onClick={onClick} style={style}>
      {details}
    </button>
  );
};

export default Cake;
