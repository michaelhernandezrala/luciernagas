/**
 * Generate the next sequence by adding one random firefly ID
 * @param {Array} currentSequence - The current sequence array
 * @param {number} numberOfFireflies - Total number of fireflies in the game
 * @returns {Array} New sequence with one additional firefly
 */
export function generateNextSequence(currentSequence, numberOfFireflies) {
  const randomFireflyId = Math.floor(Math.random() * numberOfFireflies);
  return [...currentSequence, randomFireflyId];
}

/**
 * Generate a completely new random sequence
 * @param {number} length - Length of the sequence
 * @param {number} numberOfFireflies - Total number of fireflies
 * @returns {Array} New random sequence
 */
export function generateRandomSequence(length, numberOfFireflies) {
  const sequence = [];
  for (let i = 0; i < length; i++) {
    const randomId = Math.floor(Math.random() * numberOfFireflies);
    sequence.push(randomId);
  }
  return sequence;
}
