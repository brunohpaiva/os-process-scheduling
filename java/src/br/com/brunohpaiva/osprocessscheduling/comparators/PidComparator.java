package br.com.brunohpaiva.osprocessscheduling.comparators;

import br.com.brunohpaiva.osprocessscheduling.models.Process;

import java.util.Comparator;

public class PidComparator extends ProcessComparator {

    public PidComparator() {
        super(Process::getPid);
    }

    public PidComparator(Comparator<Process> tiebreakerComparator) {
        super(Process::getPid, tiebreakerComparator);
    }

}