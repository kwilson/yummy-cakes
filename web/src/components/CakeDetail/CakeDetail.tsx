import * as React from 'react';
import './CakeDetail.css';
import { CakeModel } from '../../models/CakeModel';

import { YumFactor } from '../';

export interface CakeDetailStateProps {
  selectedCake?: CakeModel;
  close: () => any;
}

const CakeDetail: React.StatelessComponent<CakeDetailStateProps> = ({ selectedCake, close }) => {
  if (!selectedCake) {
    return null;
  }

  const comment = selectedCake.comment
    ? <blockquote>{selectedCake.comment}</blockquote>
    : 'No comments';

  return (
    <div className="cake-detail">
      <div className="cake-detail__img-container">
        <img className="cake-detail__img" src={selectedCake.imageUrl} />
      </div>

      <h1 className="cake-detail__heading">{selectedCake.name}</h1>

      <div className="cake-detail__yum">
        <YumFactor value={selectedCake.yumFactor} />
      </div>

      <div className="cake-detail__comment">
        <h2>Comments</h2>

        <div className="cake-detail__comment-value">
          {comment}
        </div>
      </div>

      <button onClick={close} className="cake-detail__close">
        Close
      </button>
    </div>
  );
};

export default CakeDetail;
