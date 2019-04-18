function Process(pid, arrivalTime, burstTime, priority) {
  this.pid = pid;
  this.arrivalTime = arrivalTime ? arrivalTime : 0;
  this.burstTime = burstTime;
  this.priority = priority;
}

Process.prototype.clone = function() {
  return Object.assign(new Process(), this);
}

module.exports = Process;
