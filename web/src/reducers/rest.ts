const reduxApi = require('redux-api');
const adapterFetch = require('redux-api/lib/adapters/fetch');

export default reduxApi({
  cakes: `http://localhost:3001/cakes/:id`
})
.use('fetch', adapterFetch(fetch));
