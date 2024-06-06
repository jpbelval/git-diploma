package com.diploma.git.backend.model;

import java.util.List;

public class Project {
    private String id_project;
    private List<Student> students;

    public String getId_project() {
        return id_project;
    }

    public void setId_project(String id_project) {
        this.id_project = id_project;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}
