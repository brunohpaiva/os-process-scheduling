import Process from "../models/Process";
import createArrivalTimeComparator from "../comparators/arrivalTime";
import createBurstTimeComparator from "../comparators/burstTime";
import { ProcessComparator, AlgorithmFunction } from "../types";
import { getTotalExecutionTime, getTotalWaitingTimeProcesses } from "../utils";

const getProcessToExecute = (
  processes: Process[],
  currentExecutionTime: number,
  burstTimeComparator: ProcessComparator
): Process =>
  processes
    .filter(
      (process): boolean =>
        process.arrivalTime <= currentExecutionTime && process.burstTime !== 0
    )
    .sort(burstTimeComparator)
    .shift() as Process;

const srtf: AlgorithmFunction = (processes, options = {}): number => {
  processes = processes
    .map((process): Process => process.clone())
    .sort(createArrivalTimeComparator(options.tiebreakerComparator));

  const burstTimeComparator = createBurstTimeComparator(
    options.tiebreakerComparator
  );
  const totalExecutionTime = getTotalExecutionTime(processes);

  for (
    let currentExecutionTime = 0;
    currentExecutionTime < totalExecutionTime;
    currentExecutionTime++
  ) {
    let process = getProcessToExecute(
      processes,
      currentExecutionTime,
      burstTimeComparator
    );

    process.executions = process.executions || [];

    let lastExecution = process.executions[process.executions.length - 1];
    if (lastExecution && lastExecution.end === currentExecutionTime) {
      lastExecution.end++;
    } else {
      process.executions.push({
        start: currentExecutionTime,
        end: currentExecutionTime + 1,
      });
    }

    process.burstTime--;
  }

  return getTotalWaitingTimeProcesses(processes) / processes.length;
};

export default srtf;
