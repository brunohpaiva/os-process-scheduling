import { Execution } from "../types";

export default class Process {
  public readonly pid: number;
  public readonly arrivalTime: number;
  public readonly priority: number;
  public burstTime: number;
  public finished: boolean = false;
  public executions: Execution[] = [];

  public constructor(
    pid: number,
    arrivalTime: number,
    burstTime: number,
    priority?: number
  ) {
    this.pid = pid;
    this.arrivalTime = arrivalTime;
    this.burstTime = burstTime;
    this.priority = priority ? priority : 0;
  }

  public clone(): Process {
    return new Process(
      this.pid,
      this.arrivalTime,
      this.burstTime,
      this.priority
    );
  }
}
