package com.diploma.git.backend.model;

import java.util.List;

public class Tutor {
    private String firstname;
    private String lastname;
    private String email;
    private List<Course> courseList;
    private String cip;

    public String getFirstname() { return firstname; }

    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getCip() { return cip; }

    public void setCip(String cip) { this.cip = cip; }

    public List<Course> getCourseList() { return courseList; }

    public void setCourseList(List<Course> courseList) { this.courseList = courseList; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getLastname() { return lastname; }

    public void setLastname(String lastname) { this.lastname = lastname; }
}
