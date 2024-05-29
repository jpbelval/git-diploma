package com.diploma.git.backend;

import com.diploma.git.backend.mapper.StudentMapper;
import com.diploma.git.backend.model.Project;
import com.diploma.git.backend.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StudentController {
    @Autowired
    StudentMapper studentMapper;

    @GetMapping("/getStudent")
    public List<Student> getStudent(@RequestParam(value = "cip") String cip) {
        Student s;
        List<Project> projects;
        List<Student>  students = studentMapper.getStudentsFromProject("1");
        for (int i = 0; i < students.size(); i++) {
            s = students.get(i);
            projects = studentMapper.getProjectsFromStudent(s.getCip());
            students.get(i).setProjets(projects);
        }
        return students;
    }


    @GetMapping("/getProject")
    public Project getProjects(@RequestParam(value = "id") int id) {
        return new Project();
    }
}
