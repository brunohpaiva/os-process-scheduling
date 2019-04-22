package br.com.brunohpaiva.osprocessscheduling;

import br.com.brunohpaiva.osprocessscheduling.algorithms.*;
import br.com.brunohpaiva.osprocessscheduling.comparators.PidComparator;
import br.com.brunohpaiva.osprocessscheduling.models.Process;

import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        List<Process> processes = new ArrayList<>();
        processes.add(new Process(1, 0, 7));
        processes.add(new Process(2, 2, 4));
        processes.add(new Process(3, 4, 1));
        processes.add(new Process(4, 5, 4));

        PidComparator pidComparator = new PidComparator();
        System.out.printf("FIFO: %s%n", Fifo.calculate(clone(processes), pidComparator));
        System.out.printf("SJF: %s%n", Sjf.calculate(clone(processes), pidComparator));
        System.out.printf("SRTF: %s%n", Srtf.calculate(clone(processes), pidComparator));
        System.out.printf("PRIORITY: %s%n", Priority.calculate(clone(processes), pidComparator));
    }

    private static List<Process> clone(List<Process> list) {
        List<Process> newList = new ArrayList<>(list.size());
        for (Process item : list)
            newList.add((Process) item.clone());
        return newList;
    }

}
