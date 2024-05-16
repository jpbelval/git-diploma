package com.diploma.git.backend.model;

import java.util.List;

public class Project {
    private List<Student> team;
    private List<File> currentFile;
    private List<Log> Logs;

    public List<Student> getTeam() {
        return team;
    }

    public void setTeam(List<Student> team) {
        this.team = team;
    }

    public List<File> getCurrentFile() {
        return currentFile;
    }

    public void setCurrentFile(List<File> currentFile) {
        this.currentFile = currentFile;
    }

    public List<Log> getLogs() {
        return Logs;
    }

    public void setLogs(List<Log> logs) {
        Logs = logs;
    }
}
