export default function calculateLevel(exp) {
  // Calculate level
  let level = Math.floor(Math.sqrt(exp / 100))
  console.log(level);
  // Calculate range

  let maxExpOfLevel = 100 * ((level + 1) * (level + 1) - level * level)

  // Calculate current exp of level

  let currentExp = exp - 100 * level * level

  return {
    level,
    maxExpOfLevel,
    currentExp
  }
}