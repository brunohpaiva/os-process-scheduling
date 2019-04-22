package br.com.brunohpaiva.osprocessscheduling.algorithms;

import br.com.brunohpaiva.osprocessscheduling.comparators.ArrivalTimeComparator;
import br.com.brunohpaiva.osprocessscheduling.models.Process;

import java.util.Comparator;
import java.util.List;

public class Fifo {

    public static Double calculate(List<Process> processes, Comparator<Process> tiebreakerComparator) {
        processes.sort(new ArrivalTimeComparator(tiebreakerComparator));

        int currentExecutionTime = 0;
        double totalWaitingTime = 0.0;

        for (Process process : processes) {
            int executedAt = currentExecutionTime;
            currentExecutionTime += process.getBurstTime();
            int waitingTime = executedAt - process.getArrivalTime();
            totalWaitingTime += waitingTime;
        }

        return totalWaitingTime / processes.size();
    }

}
