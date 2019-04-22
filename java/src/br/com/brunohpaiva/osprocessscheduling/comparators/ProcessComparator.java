package br.com.brunohpaiva.osprocessscheduling.comparators;

import br.com.brunohpaiva.osprocessscheduling.models.Process;

import java.util.Comparator;
import java.util.function.Function;

public class ProcessComparator implements Comparator<Process> {

    private final Function<Process, Integer> function;
    private Comparator<Process> tiebreakerComparator;

    public ProcessComparator(Function<Process, Integer> function) {
        this.function = function;
    }

    public ProcessComparator(Function<Process, Integer> function, Comparator<Process> tiebreakerComparator) {
        this.function = function;
        this.tiebreakerComparator = tiebreakerComparator;
    }

    @Override
    public int compare(Process processOne, Process processTwo) {
        int result = Integer.compare(function.apply(processOne), function.apply(processTwo));
        if (result != 0)
            return result;

        if (tiebreakerComparator == null)
            throw new IllegalStateException("A tiebreaker comparator is required");

        return tiebreakerComparator.compare(processOne, processTwo);
    }

}
