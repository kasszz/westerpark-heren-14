module.exports = (match, isOpponent) => {
  return match.goals.filter(goal => {
    if (!goal.player && isOpponent) {
      return goal
    } else if (goal.player && !isOpponent) {
      return goal
    }
  })
}
