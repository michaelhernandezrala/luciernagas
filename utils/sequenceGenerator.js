/**
 * Get valid firefly IDs based on number of fireflies
 * Must match the logic in FireflyGrid
 * @param {number} numberOfFireflies - Total number of fireflies in the game
 * @returns {Array} Array of valid firefly IDs
 */
export function getValidFireflyIds(numberOfFireflies) {
  const luciernaganIndex = 9;
  let fireflies = [];
  
  if (numberOfFireflies > luciernaganIndex) {
    // If we have more buttons than luciernaganIndex, include everything up to numberOfFireflies
    fireflies = Array.from({ length: numberOfFireflies }, (_, i) => i);
  } else {
    // If we have fewer buttons, include luciérnaga and fill with others
    fireflies = Array.from({ length: numberOfFireflies - 1 }, (_, i) => i);
    fireflies.push(luciernaganIndex); // Always add luciérnaga
  }
  
  return fireflies;
}

/**
 * Generate the next sequence by adding one random firefly ID
 * Different from the last one to avoid repetition
 * @param {Array} currentSequence - The current sequence array
 * @param {number} numberOfFireflies - Total number of fireflies in the game
 * @returns {Array} New sequence with one additional firefly
 */
export function generateNextSequence(currentSequence, numberOfFireflies) {
  const validIds = getValidFireflyIds(numberOfFireflies);
  let randomFireflyId;
  const lastId = currentSequence[currentSequence.length - 1];
  
  // If there's only one firefly or sequence is empty, just pick any
  if (validIds.length === 1 || currentSequence.length === 0) {
    randomFireflyId = validIds[Math.floor(Math.random() * validIds.length)];
  } else {
    // Generate a different ID from the last one
    do {
      randomFireflyId = validIds[Math.floor(Math.random() * validIds.length)];
    } while (randomFireflyId === lastId);
  }
  
  return [...currentSequence, randomFireflyId];
}

/**
 * Generate a completely new random sequence
 * @param {number} length - Length of the sequence
 * @param {number} numberOfFireflies - Total number of fireflies
 * @returns {Array} New random sequence
 */
export function generateRandomSequence(length, numberOfFireflies) {
  const validIds = getValidFireflyIds(numberOfFireflies);
  const sequence = [];
  for (let i = 0; i < length; i++) {
    const randomId = validIds[Math.floor(Math.random() * validIds.length)];
    sequence.push(randomId);
  }
  return sequence;
}
