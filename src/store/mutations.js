export function updateScores(state, {score, level}) {
  state.scores[level - 1] = score;
}
export function changeCharacter(state, character) {
  state.character = character;
}
