import Process from "./models/Process";

export type ProcessComparator = (
  processOne: Process,
  processTwo: Process
) => number;

export type ProcessPropertyComparatorCreator = (
  processPropertyName: Exclude<
    keyof Process,
    "clone" | "executions" | "finished"
  >
) => ProcessComparatorCreator;

export type ProcessComparatorCreator = (
  tiebreakerComparator?: ProcessComparator,
  direction?: Direction
) => ProcessComparator;

export type AlgorithmFunction = (
  processes: Process[],
  options?: {
    tiebreakerComparator?: ProcessComparator;
    quantum?: number,
    priorityDirection?: Direction
  }
) => number;

export type Direction = "ASC" | "DESC";

export interface Execution {
  start: number;
  end: number;
}
