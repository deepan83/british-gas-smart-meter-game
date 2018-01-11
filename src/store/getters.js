export function scores(state) {
  return state.scores;
}
export function totalScore(state) {
  return state.scores.reduce((total, score) => {
    return total + score;
  }, 0);
}
export function character(state) {
  return state.character;
}
export function audio(state) {
  return state.audio;
}
