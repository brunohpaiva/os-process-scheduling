const createArrivalTimeComparator = require("../comparators/arrivalTime");
const createPriorityComparator = require("../comparators/priority");

const priority = (processes, priorityDirection) => {
  let sortedProcesses = processes.sort(
    createPriorityComparator(
      createArrivalTimeComparator(),
      priorityDirection ? priorityDirection : "desc"
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

module.exports = priority;
