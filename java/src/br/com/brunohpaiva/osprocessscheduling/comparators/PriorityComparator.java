package br.com.brunohpaiva.osprocessscheduling.comparators;

import br.com.brunohpaiva.osprocessscheduling.models.Process;

import java.util.Comparator;

public class PriorityComparator implements Comparator<Process> {

    private String direction = "asc";
    private Comparator<Process> tiebreakerComparator;

    public PriorityComparator(String direction) {
        this.direction = direction;
    }

    public PriorityComparator(Comparator<Process> tiebreakerComparator) {
        this.tiebreakerComparator = tiebreakerComparator;
    }

    public PriorityComparator(String direction, Comparator<Process> tiebreakerComparator) {
        this.direction = direction;
        this.tiebreakerComparator = tiebreakerComparator;
    }

    @Override
    public int compare(Process processOne, Process processTwo) {
        int result = "desc".equals(direction)
                ? Integer.compare(processTwo.getPriority(), processOne.getPriority())
                : Integer.compare(processOne.getPriority(), processTwo.getPriority());
        if (result != 0)
            return result;

        if (tiebreakerComparator == null)
            throw new IllegalStateException("A tiebreaker comparator is required");

        return tiebreakerComparator.compare(processOne, processTwo);
    }

}