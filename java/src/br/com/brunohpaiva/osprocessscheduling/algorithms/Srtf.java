package br.com.brunohpaiva.osprocessscheduling.algorithms;

import br.com.brunohpaiva.osprocessscheduling.comparators.ArrivalTimeComparator;
import br.com.brunohpaiva.osprocessscheduling.comparators.BurstTimeComparator;
import br.com.brunohpaiva.osprocessscheduling.models.Process;

import java.util.Comparator;
import java.util.List;

public class Srtf {

    public static Double calculate(List<Process> processes, Comparator<Process> tiebreakerComparator) {
        processes.sort(new ArrivalTimeComparator(tiebreakerComparator));

        Comparator<Process> burstTimeComparator = new BurstTimeComparator(tiebreakerComparator);
        int totalExecutionTime = getTotalExecutionTime(processes);

        for (int currentExecutionTime = 0; currentExecutionTime < totalExecutionTime; currentExecutionTime++) {
            Process process = getProcessToExecute(processes, currentExecutionTime, burstTimeComparator);

            List<Process.Execution> executions = process.getExecutions();
            Process.Execution lastExecution = !executions.isEmpty() ? executions.get(executions.size() - 1) : null;
            if (lastExecution != null && lastExecution.getEnd() == currentExecutionTime)
                lastExecution.setEnd(lastExecution.getEnd() + 1);
            else
                executions.add(new Process.Execution(currentExecutionTime, currentExecutionTime + 1));

            process.setBurstTime(process.getBurstTime() - 1);
        }

        return getTotalWaitingTime(processes) / processes.size();
    }

    public static Process getProcessToExecute(List<Process> processes, int currentExecutionTime, Comparator<Process> burstTimeComparator) {
        return processes.stream().filter(process -> process.getArrivalTime() <= currentExecutionTime && process.getBurstTime() != 0).min(burstTimeComparator).orElse(null);
    }

    public static int getTotalExecutionTime(List<Process> processes) {
        return processes.stream().mapToInt(Process::getBurstTime).sum();
    }

    public static double getTotalWaitingTime(List<Process> processes) {
        return processes.stream().mapToDouble(process -> {
            int sum = 0;
            for (int index = 0; index < process.getExecutions().size(); index++)
                sum += process.getExecutions().get(index).getStart() -
                        (index == 0 ? process.getArrivalTime() : process.getExecutions().get(index - 1).getEnd());
            return sum;
        }).sum();
    }

}
