import createArrivalTimeComparator from "../comparators/arrivalTime";
import { ProcessComparator, AlgorithmFunction } from "../types";
import Process from "../models/Process";
import { getTotalWaitingTimeProcesses } from "../utils";

const executionsComparator: ProcessComparator = (
  processOne,
  processTwo
): number => {
  const countExecutionsProcessOne = processOne.executions.length;
  const countExecutionsProcessTwo = processTwo.executions.length;
  return countExecutionsProcessOne - countExecutionsProcessTwo;
};

const getNewQueueItems = (
  processes: Process[],
  currentExecutionTime: number,
  arrivalTimeComparator: ProcessComparator
): Process[] =>
  processes
    .filter(
      (process): boolean =>
        process.arrivalTime <= currentExecutionTime && process.burstTime !== 0
    )
    .sort(arrivalTimeComparator)
    .sort(executionsComparator);

const rr: AlgorithmFunction = (processes, options = {}): number => {
  if (!options.quantum) {
    throw new Error("quantum is not defined");
  }

  const arrivalTimeComparator = createArrivalTimeComparator(
    options.tiebreakerComparator
  );

  processes = processes
    .map((process): Process => process.clone())
    .sort(arrivalTimeComparator);

  let currentExecutionTime = 0;
  const queue = getNewQueueItems(
    processes,
    currentExecutionTime,
    arrivalTimeComparator
  );

  for (let processIndex = 0; processIndex < queue.length; processIndex++) {
    const process = queue[processIndex];

    let unitsToExecute =
      process.burstTime > options.quantum ? options.quantum : process.burstTime;

    while (unitsToExecute > 0) {
      let lastExecution = process.executions[process.executions.length - 1];
      if (lastExecution && lastExecution.end === currentExecutionTime) {
        lastExecution.end++;
      } else {
        process.executions.push({
          start: currentExecutionTime,
          end: currentExecutionTime + 1,
        });
      }

      currentExecutionTime++;
      process.burstTime--;
      unitsToExecute--;
    }

    if (processIndex === queue.length - 1) {
      getNewQueueItems(
        processes,
        currentExecutionTime,
        arrivalTimeComparator
      ).forEach(
        (item): void => {
          queue.push(item);
        }
      );
    }
  }

  return getTotalWaitingTimeProcesses(processes) / processes.length;
};

export default rr;
