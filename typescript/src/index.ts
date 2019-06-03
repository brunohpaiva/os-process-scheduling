import Process from "./models/Process";
import createPidComparator from "./comparators/pid";
import calculateAverageTimeFifo from "./algorithms/fifo";
import calculateAverageTimeSjf from "./algorithms/sjf";
import calculateAverageTimeSrtf from "./algorithms/srtf";
import calculateAverageTimePriority from "./algorithms/priority";
import calculateAverageTimeRr from "./algorithms/rr";

const processes = [
  new Process(1, 0, 7),
  new Process(2, 2, 4),
  new Process(3, 4, 1),
  new Process(4, 5, 4),
];

console.log("FIFO", calculateAverageTimeFifo(processes));
console.log(
  "SJF",
  calculateAverageTimeSjf(processes, {
    tiebreakerComparator: createPidComparator(),
  })
);
console.log(
  "SRTF",
  calculateAverageTimeSrtf(processes, {
    tiebreakerComparator: createPidComparator(),
  })
);
console.log("PRIORITY", calculateAverageTimePriority(processes));
console.log(
  "RR",
  calculateAverageTimeRr(processes, {
    quantum: 4,
  })
);
