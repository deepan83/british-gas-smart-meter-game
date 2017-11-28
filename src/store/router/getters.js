import routes from './routes'

export const view = (state) => {
  return routes[state.route.name];
}

export const params = state => {
  return state.route.params;
}

export const route = (state) => {
  return state.route;
}
