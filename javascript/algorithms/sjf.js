const createArrivalTimeComparator = require("../comparators/arrivalTime");
const createBurstTimeComparator = require("../comparators/burstTime");

const getNextProcess = (
  processes,
  currentExecutionTime,
  tiebreakerComparator
) => {
  let burstTimeComparator = createBurstTimeComparator(tiebreakerComparator);
  return processes
    .filter(
      process =>
        process.arrivalTime <= currentExecutionTime && !process.finished
    )
    .sort(burstTimeComparator)[0];
};

const sjf = (processes, tiebreakerComparator) => {
  processes = processes
    .map(process => process.clone())
    .sort(createArrivalTimeComparator(tiebreakerComparator));

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
      tiebreakerComparator
    );
  }

  return totalWaitingTime / processes.length;
};

module.exports = sjf;
