const arrivalTimeComparator = require('../comparators/arrivalTime');

const fifo = (processes, tiebreakerComparator) => {
  let sortedProcesses = processes.sort(arrivalTimeComparator(tiebreakerComparator));

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
