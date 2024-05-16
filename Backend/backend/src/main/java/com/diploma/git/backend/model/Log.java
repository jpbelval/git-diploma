package com.diploma.git.backend.model;

import java.util.List;

public class Log {
    private String date;
    private Student pusher;
    private List<File> files;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<File> getFiles() {
        return files;
    }

    public void setFiles(List<File> files) {
        this.files = files;
    }

    public Student getPusher() {
        return pusher;
    }

    public void setPusher(Student pusher) {
        this.pusher = pusher;
    }
}
