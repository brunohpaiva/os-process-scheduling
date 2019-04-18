const createArrivalTimeComparator = require("../comparators/arrivalTime");

const fifo = (processes, tiebreakerComparator) => {
  let sortedProcesses = processes
    .map(process => process.clone())
    .sort(createArrivalTimeComparator(tiebreakerComparator));

  let currentExecutionTime = 0;
  let totalWaitingTime = 0;
  for (let index = 0; index < sortedProcesses.length; index++) {
    let process = sortedProcesses[index];

    let executedAt = currentExecutionTime;
    currentExecutionTime += process.burstTime;
    let waitingTime = executedAt - process.arrivalTime;
    totalWaitingTime += waitingTime;
  }

  return totalWaitingTime / sortedProcesses.length;
};

module.exports = fifo;
