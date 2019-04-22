package br.com.brunohpaiva.osprocessscheduling.algorithms;

import br.com.brunohpaiva.osprocessscheduling.comparators.ArrivalTimeComparator;
import br.com.brunohpaiva.osprocessscheduling.comparators.BurstTimeComparator;
import br.com.brunohpaiva.osprocessscheduling.models.Process;

import java.util.Comparator;
import java.util.List;

public class Sjf {

    public static Double calculate(List<Process> processes, Comparator<Process> tiebreakerComparator) {
        processes.sort(new ArrivalTimeComparator(tiebreakerComparator));

        Comparator<Process> burstTimeComparator = new BurstTimeComparator(tiebreakerComparator);
        int currentExecutionTime = 0;
        double totalWaitingTime = 0.0;
        Process process = processes.get(0);

        while (process != null) {
            int executedAt = currentExecutionTime;
            currentExecutionTime += process.getBurstTime();
            int waitingTime = executedAt - process.getArrivalTime();
            totalWaitingTime += waitingTime;

            process.setFinished(true);
            process = getNextProcess(processes, currentExecutionTime, burstTimeComparator);
        }

        return totalWaitingTime / processes.size();
    }

    public static Process getNextProcess(List<Process> processes, int currentExecutionTime, Comparator<Process> burstTimeComparator) {
        return processes.stream().filter(process -> process.getArrivalTime() <= currentExecutionTime && !process.isFinished()).min(burstTimeComparator).orElse(null);
    }

}
