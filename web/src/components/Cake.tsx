import * as React from 'react';
import { CakeModel } from '../models/CakeModel';

import './Cake.css';

export interface CakeProps {
  cake: CakeModel;
  selectCake: () => any;
}

const Cake: React.StatelessComponent<CakeProps> = props => {
  const onClick = () => props.selectCake();

  const style: React.CSSProperties = {
    backgroundImage: props.cake.imageUrl
      ? `url(${props.cake.imageUrl})`
      : ''
  };

  return (
    <button className="cake" onClick={onClick} style={style}>
      <div className="cake__details">
        {props.cake.name}
      </div>
    </button>
  );
};

export default Cake;
