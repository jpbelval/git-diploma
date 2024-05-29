package com.diploma.git.backend;

import com.diploma.git.backend.mapper.StudentMapper;
import com.diploma.git.backend.model.*;
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

    @GetMapping("/getStudents")
    public List<Student> getStudents(@RequestParam(value = "id_project") String id_project) {
        Student s;
        List<Project> projects;
        List<Student>  students = studentMapper.getStudentsFromProject(id_project);
        for (int i = 0; i < students.size(); i++) {
            s = students.get(i);
            projects = studentMapper.getProjectsFromStudent(s.getCip());
            students.get(i).setProjets(projects);
        }
        return students;
    }

    @GetMapping("/getProjects")
    public List<Project> getProjects(@RequestParam(value = "cip") String cip) {
        return studentMapper.getProjectsFromStudent(cip);
    }

    @GetMapping("/getClass")
    public List<Classe> getClasses(@RequestParam(value = "id_project") String id_project) {
        return studentMapper.getClassesFromProject(id_project);
    }

    @GetMapping("/getTutors")
    public List<Tutor> getTutors(@RequestParam(value = "id_project") String id_project) {
        //ajouter le get courses
        List<Tutor> tutors = studentMapper.getTutorsFromProject(id_project);
        return tutors;
    }

    @GetMapping("/getEvents")
    public List<Event> getEvents(@RequestParam(value = "id_project") String id_project) {
        return studentMapper.getEventFromProject(id_project);
    }

    @GetMapping("/getFiles")
    public List<File> getFiles(@RequestParam(value = "id_project") String id_project) {
        return studentMapper.getFilesFromProject(id_project);
    }
}
