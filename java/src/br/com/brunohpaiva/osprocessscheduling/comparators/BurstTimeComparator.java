package br.com.brunohpaiva.osprocessscheduling.comparators;


import br.com.brunohpaiva.osprocessscheduling.models.Process;

import java.util.Comparator;

public class BurstTimeComparator extends ProcessComparator {

    public BurstTimeComparator() {
        super(Process::getBurstTime);
    }

    public BurstTimeComparator(Comparator<Process> tiebreakerComparator) {
        super(Process::getBurstTime, tiebreakerComparator);
    }

}
