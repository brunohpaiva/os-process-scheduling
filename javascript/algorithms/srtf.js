const createArrivalTimeComparator = require("../comparators/arrivalTime");
const createBurstTimeComparator = require("../comparators/burstTime");

const getProcessToExecute = (
  processes,
  currentExecutionTime,
  burstTimeComparator
) => {
  return processes
    .filter(
      process =>
        process.arrivalTime <= currentExecutionTime && process.burstTime !== 0
    )
    .sort(burstTimeComparator)[0];
};

const srtf = (processes, tiebreakerComparator) => {
  processes = processes
    .map(process => process.clone())
    .sort(createArrivalTimeComparator(tiebreakerComparator));

  let burstTimeComparator = createBurstTimeComparator(tiebreakerComparator);
  let totalExecutionTime = processes.reduce(
    (total, processOne) => total + processOne.burstTime,
    0
  );

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
    if (process.executions.length > 0) {
      let lastExecution = process.executions[process.executions.length - 1];
      if (lastExecution.end === currentExecutionTime) {
        lastExecution.end++;
      } else {
        process.executions.push({
          start: currentExecutionTime,
          end: currentExecutionTime + 1
        });
      }
    } else {
      process.executions.push({
        start: currentExecutionTime,
        end: currentExecutionTime + 1
      });
    }
    process.burstTime--;
  }

  let totalWaitingTime = 0;
  processes.forEach(process => {
    for (
      let executionIndex = 0;
      executionIndex < process.executions.length;
      executionIndex++
    ) {
      let execution = process.executions[executionIndex];
      if (executionIndex === 0) {
        totalWaitingTime += execution.start - process.arrivalTime;
      } else {
        let previousExecution = process.executions[executionIndex - 1];
        totalWaitingTime += execution.start - previousExecution.end;
      }
    }
  });

  return totalWaitingTime / processes.length;
};

module.exports = srtf;
