import createArrivalTimeComparator from "../comparators/arrivalTime";
import createBurstTimeComparator from "../comparators/burstTime";
import { AlgorithmFunction, ProcessComparator } from "../types";
import Process from "../models/Process";

const getNextProcess = (
  processes: Process[],
  currentExecutionTime: number,
  tiebreakerComparator?: ProcessComparator
): Process => {
  let burstTimeComparator = createBurstTimeComparator(tiebreakerComparator);
  return processes
    .filter(
      (process): boolean =>
        process.arrivalTime <= currentExecutionTime && !process.finished
    )
    .sort(burstTimeComparator)
    .shift() as Process;
};

const sjf: AlgorithmFunction = (processes, options = {}): number => {
  processes = processes
    .map((process): Process => process.clone())
    .sort(createArrivalTimeComparator(options.tiebreakerComparator));

  let currentExecutionTime = 0;
  let totalWaitingTime = 0;
  let process = processes[0];

  while (process) {
    let executedAt = currentExecutionTime;
    currentExecutionTime += process.burstTime;
    let waitingTime = executedAt - process.arrivalTime;
    totalWaitingTime += waitingTime;

    process.finished = true;
    process = getNextProcess(
      processes,
      currentExecutionTime,
      options.tiebreakerComparator
    );
  }

  return totalWaitingTime / processes.length;
};

export default sjf;
