const createArrivalTimeComparator = require("../comparators/arrivalTime");

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

const executionsComparator = (processOne, processTwo) => {
  let countExecutionsProcessOne = processOne.executions
    ? processOne.executions.length
    : 0;
  let countExecutionsProcessTwo = processTwo.executions
    ? processTwo.executions.length
    : 0;

  return countExecutionsProcessOne - countExecutionsProcessTwo;
};

const getNewQueueItems = (
  processes,
  currentExecutionTime,
  arrivalTimeComparator
) =>
  processes
    .filter(
      process =>
        process.arrivalTime <= currentExecutionTime && process.burstTime !== 0
    )
    .sort(arrivalTimeComparator)
    .sort(executionsComparator);

const rr = (processes, quantum, tiebreakerComparator) => {
  if (!quantum) {
    throw new Error("quantum is not defined");
  }

  let arrivalTimeComparator = createArrivalTimeComparator(tiebreakerComparator);

  processes = processes
    .map(process => process.clone())
    .sort(arrivalTimeComparator);

  let currentExecutionTime = 0;
  let queue = getNewQueueItems(
    processes,
    currentExecutionTime,
    arrivalTimeComparator
  );

  for (let processIndex = 0; processIndex < queue.length; processIndex++) {
    let process = queue[processIndex];
    process.executions = process.executions || [];

    let unitsToExecute =
      process.burstTime > quantum ? quantum : process.burstTime;

    while (unitsToExecute > 0) {
      let lastExecution = process.executions[process.executions.length - 1];
      if (lastExecution && lastExecution.end === currentExecutionTime) {
        lastExecution.end++;
      } else {
        process.executions.push({
          start: currentExecutionTime,
          end: currentExecutionTime + 1
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
      ).forEach(item => queue.push(item));
    }
  }

  return getTotalWaitingTimeProcesses(processes) / processes.length;
};

module.exports = rr;
