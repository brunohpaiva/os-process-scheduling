const createArrivalTimeComparator = require("../comparators/arrivalTime");
const createBurstTimeComparator = require("../comparators/burstTime");

const getTotalExecutionTime = processes =>
  processes.reduce((total, processOne) => total + processOne.burstTime, 0);

const getTotalWaitingTimeProcess = process =>
  process.executions.reduce(
    (totalProcess, execution, index) =>
      totalProcess +
      execution.start -
      (index === 0 ? process.arrivalTime : process.executions[index - 1].end),
    0
  );

const getTotalWaitingTimeProcesses = processes =>
  processes.reduce(
    (total, process) => total + getTotalWaitingTimeProcess(process),
    0
  );

const getProcessToExecute = (
  processes,
  currentExecutionTime,
  burstTimeComparator
) =>
  processes
    .filter(
      process =>
        process.arrivalTime <= currentExecutionTime && process.burstTime !== 0
    )
    .sort(burstTimeComparator)[0];

const srtf = (processes, tiebreakerComparator) => {
  processes = processes
    .map(process => process.clone())
    .sort(createArrivalTimeComparator(tiebreakerComparator));

  let burstTimeComparator = createBurstTimeComparator(tiebreakerComparator);
  let totalExecutionTime = getTotalExecutionTime(processes);

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
        end: currentExecutionTime + 1
      });
    }

    process.burstTime--;
  }

  let totalWaitingTime = getTotalWaitingTimeProcesses(processes);

  return totalWaitingTime / processes.length;
};

module.exports = srtf;
