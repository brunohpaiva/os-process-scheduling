const createGenericComparator = processPropertyName => (
  tiebreakerComparator,
  direction
) => (processOne, processTwo) => {
  let valueOne = processOne[processPropertyName];
  let valueTwo = processTwo[processPropertyName];
  let result = direction === "desc" ? valueTwo - valueOne : valueOne - valueTwo;

  if (result !== 0) {
    return result;
  }

  if (!tiebreakerComparator) {
    throw new Error("A tiebreaker comparator is required");
  }

  return tiebreakerComparator(processOne, processTwo);
};

module.exports = createGenericComparator;
