package br.com.brunohpaiva.osprocessscheduling.models;

import java.util.ArrayList;
import java.util.List;

public class Process implements Cloneable {

    private int pid;
    private int arrivalTime;
    private int burstTime;
    private int priority;
    private boolean finished = false;
    private List<Execution> executions = new ArrayList<>();

    public Process(int pid, int arrivalTime, int burstTime, int priority) {
        this.pid = pid;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.priority = priority;
    }

    public Process(int pid, int arrivalTime, int burstTime) {
        this(pid, arrivalTime, burstTime, 0);
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public int getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(int arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public int getBurstTime() {
        return burstTime;
    }

    public void setBurstTime(int burstTime) {
        this.burstTime = burstTime;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    public List<Execution> getExecutions() {
        return executions;
    }

    public void setExecutions(List<Execution> executions) {
        this.executions = executions;
    }

    @Override
    public Object clone()  {
        try {
            return super.clone();
        } catch (CloneNotSupportedException e) {
            return this;
        }
    }

    @Override
    public String toString() {
        return "Process{pid=" + pid + "}";
    }

    public static class Execution implements Cloneable {

        private int start;
        private int end;

        public Execution(int start, int end) {
            this.start = start;
            this.end = end;
        }

        public int getStart() {
            return start;
        }

        public void setStart(int start) {
            this.start = start;
        }

        public int getEnd() {
            return end;
        }

        public void setEnd(int end) {
            this.end = end;
        }

        @Override
        public Object clone()  {
            try {
                return super.clone();
            } catch (CloneNotSupportedException e) {
                return this;
            }
        }

    }

}
