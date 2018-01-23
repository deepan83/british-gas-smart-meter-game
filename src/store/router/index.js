import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

// initial state
const state = {
  // route: {name: 'initial'}
  route: {name: 'game', params: {'level': 1}}
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
