import Process from "./models/Process";

export const getTotalExecutionTime = (processes: Process[]): number =>
  processes.reduce(
    (total, processOne): number => total + processOne.burstTime,
    0
  );

export const getTotalWaitingTimeProcess = (process: Process): number =>
  process.executions.reduce(
    (totalProcess, execution, index): number =>
      totalProcess +
      execution.start -
      (index === 0 ? process.arrivalTime : process.executions[index - 1].end),
    0
  );

export const getTotalWaitingTimeProcesses = (processes: Process[]): number =>
  processes.reduce(
    (total, process): number => total + getTotalWaitingTimeProcess(process),
    0
  );
