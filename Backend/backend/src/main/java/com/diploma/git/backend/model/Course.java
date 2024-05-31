package com.diploma.git.backend.model;

import java.util.List;

public class Course {
    private String sigle;
    private String name;
    private List<Project> teamProjects;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSigle() {
        return sigle;
    }

    public void setSigle(String sigle) {
        this.sigle = sigle;
    }

    public List<Project> getTeamProjects() {
        return teamProjects;
    }

    public void setTeamProjects(List<Project> teamProjects) {
        this.teamProjects = teamProjects;
    }
}
