const createGenericComparator = processPropertyName => tiebreakerComparator => (
  processOne,
  processTwo
) => {
  let result =
    processOne[processPropertyName] - processTwo[processPropertyName];
  if (result !== 0) {
    return result;
  }
  if (!tiebreakerComparator) {
    throw new Error("A tiebreaker comparator is required");
  }
  return tiebreakerComparator(processOne, processTwo);
};

module.exports = createGenericComparator;
