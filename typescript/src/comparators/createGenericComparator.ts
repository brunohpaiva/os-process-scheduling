import {
  ProcessComparator,
  ProcessComparatorCreator,
  ProcessPropertyComparatorCreator,
} from "../types";

const createGenericComparator: ProcessPropertyComparatorCreator = (
  processPropertyName
): ProcessComparatorCreator => (
  tiebreakerComparator,
  direction
): ProcessComparator => (processOne, processTwo): number => {
  let valueOne = processOne[processPropertyName];
  let valueTwo = processTwo[processPropertyName];
  let result = direction === "DESC" ? valueTwo - valueOne : valueOne - valueTwo;

  if (result !== 0) {
    return result;
  }

  if (!tiebreakerComparator) {
    throw new Error("A tiebreaker comparator is required");
  }

  return tiebreakerComparator(processOne, processTwo);
};

export default createGenericComparator;
