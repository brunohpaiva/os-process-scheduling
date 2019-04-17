function Process(pid, arrivalTime, burstTime, priority) {
  this.pid = pid;
  this.arrivalTime = arrivalTime ? arrivalTime : 0;
  this.burstTime = burstTime;
  this.priority = priority;
}

module.exports = Process;
