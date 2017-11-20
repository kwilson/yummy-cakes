import { CakeModel } from '../models/CakeModel';

const reduxApi = require('redux-api');
const adapterFetch = require('redux-api/lib/adapters/fetch');

export interface RestState {
  cakes: {
    loading: boolean;
    data: {
      data?: CakeModel[]
    }
  };
}

export default reduxApi({
  cakes: `http://ec2-52-209-201-89.eu-west-1.compute.amazonaws.com/api/cakes/:id`
})
  .use('fetch', adapterFetch(fetch));
