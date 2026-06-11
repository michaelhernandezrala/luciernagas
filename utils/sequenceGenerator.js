/**
 * Generate the next sequence by adding one random firefly ID
 * Different from the last one to avoid repetition
 * @param {Array} currentSequence - The current sequence array
 * @param {number} numberOfFireflies - Total number of fireflies in the game
 * @returns {Array} New sequence with one additional firefly
 */
export function generateNextSequence(currentSequence, numberOfFireflies) {
  let randomFireflyId;
  const lastId = currentSequence[currentSequence.length - 1];
  
  // If there's only one firefly or sequence is empty, just pick any
  if (numberOfFireflies === 1 || currentSequence.length === 0) {
    randomFireflyId = Math.floor(Math.random() * numberOfFireflies);
  } else {
    // Generate a different ID from the last one
    do {
      randomFireflyId = Math.floor(Math.random() * numberOfFireflies);
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
  const sequence = [];
  for (let i = 0; i < length; i++) {
    const randomId = Math.floor(Math.random() * numberOfFireflies);
    sequence.push(randomId);
  }
  return sequence;
}
