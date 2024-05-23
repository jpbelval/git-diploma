package com.diploma.git.backend.model;

import java.util.List;

public class Course {
    private String courseName;
    private List<Project> teamList;

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public List<Project> getTeamList() {
        return teamList;
    }

    public void setTeamList(List<Project> teamList) {
        this.teamList = teamList;
    }

}
