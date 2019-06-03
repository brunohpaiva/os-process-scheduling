import createArrivalTimeComparator from "../comparators/arrivalTime";
import createPriorityComparator from "../comparators/priority";
import { AlgorithmFunction } from "../types";
import Process from "../models/Process";

const priority: AlgorithmFunction = (processes, options = {}): number => {
  const sortedProcesses = processes
    .map((process): Process => process.clone())
    .sort(
      createPriorityComparator(
        createArrivalTimeComparator(),
        options.priorityDirection ? options.priorityDirection : "DESC"
      )
    );

  let currentExecutionTime = 0;
  let totalWaitingTime = 0;
  for (let index = 0; index < sortedProcesses.length; index++) {
    let process = sortedProcesses[index];

    let executedAt = currentExecutionTime;
    currentExecutionTime += process.burstTime;
    let waitingTime = executedAt - process.arrivalTime;
    if (waitingTime < 0) {
      waitingTime = 0;
    }
    totalWaitingTime += waitingTime;
  }

  return totalWaitingTime / sortedProcesses.length;
};

export default priority;
