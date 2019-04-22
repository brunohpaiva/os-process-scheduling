package br.com.brunohpaiva.osprocessscheduling.comparators;

import br.com.brunohpaiva.osprocessscheduling.models.Process;

import java.util.Comparator;

public class ArrivalTimeComparator extends ProcessComparator {

    public ArrivalTimeComparator() {
        super(Process::getArrivalTime);
    }

    public ArrivalTimeComparator(Comparator<Process> tiebreakerComparator) {
        super(Process::getArrivalTime, tiebreakerComparator);
    }

}
