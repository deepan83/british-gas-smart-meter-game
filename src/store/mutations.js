export function updateScores(state, {score, level}) {
  state.scores[level] = score;
}
export function changeCharacter(state, character) {
  state.character = character;
}
