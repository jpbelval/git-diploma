package com.diploma.git.backend;

import com.diploma.git.backend.model.Project;
import com.diploma.git.backend.model.Student;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StudentController {
    @GetMapping("/getStudent")
    public Student getStudent(@RequestParam(value = "cip") String cip) {
        Student etudiant = new Student();
        etudiant.setCip(cip);
        etudiant.setNom("george hamburger");
        return etudiant;
    }

    @GetMapping("/getProject")
    public Project getProjects(@RequestParam(value = "id") int id) {
        return new Project();
    }
}
