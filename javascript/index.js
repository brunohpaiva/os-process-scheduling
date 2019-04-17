const Process = require("./models/Process");
const createPidComparator = require("./comparators/pid");
const calculateAverageTimeFifo = require("./algorithms/fifo");
const calculateAverageTimeSjf = require("./algorithms/sjf");

const processes = [
  new Process(1, 0, 7),
  new Process(2, 2, 4),
  new Process(3, 4, 1),
  new Process(4, 5, 4)
];

console.log(calculateAverageTimeFifo(processes));
console.log(calculateAverageTimeSjf(processes, createPidComparator()));
