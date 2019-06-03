import { AlgorithmFunction } from "../types";
import Process from "../models/Process";
import createArrivalTimeComparator from "../comparators/arrivalTime";

const fifo: AlgorithmFunction = (processes, options = {}): number => {
  const sortedProcesses = processes
    .map((process): Process => process.clone())
    .sort(createArrivalTimeComparator(options.tiebreakerComparator));

  let currentExecutionTime = 0;
  let totalWaitingTime = 0;
  for (let index = 0; index < sortedProcesses.length; index++) {
    const process = sortedProcesses[index];

    let executedAt = currentExecutionTime;
    currentExecutionTime += process.burstTime;
    let waitingTime = executedAt - process.arrivalTime;
    totalWaitingTime += waitingTime;

    process.finished = true;
  }

  return totalWaitingTime / sortedProcesses.length;
};

export default fifo;
