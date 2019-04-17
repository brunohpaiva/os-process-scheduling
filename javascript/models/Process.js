function Process(pid, arrivalTime, burstTime) {
  this.pid = pid;
  this.arrivalTime = arrivalTime ? arrivalTime : 0;
  this.burstTime = burstTime;
}

module.exports = Process;
