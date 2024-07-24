package com.diploma.git.backend;

import com.diploma.git.backend.gitolite.GitoliteManager;
import com.diploma.git.backend.model.Project;
import com.diploma.git.backend.model.Student;
import com.diploma.git.backend.mapper.StudentMapper;
import com.diploma.git.backend.model.*;
import gitolite.manager.exceptions.GitException;
import gitolite.manager.exceptions.ModificationException;
import gitolite.manager.exceptions.ServiceUnavailable;
import gitolite.manager.models.Config;
import gitolite.manager.models.User;
import org.eclipse.jgit.api.TransportConfigCallback;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
@CrossOrigin
public class StudentController {
    private GitoliteManager gitoliteManager;
    @Autowired
    StudentMapper studentMapper;


    @Autowired
    public StudentController(GitoliteManager gitoliteManager){
        this.gitoliteManager = gitoliteManager;
    }

    @GetMapping("/getStudents")
    public List<Student> getStudents(@RequestParam(value = "id_project") int id_project) {
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
        List<Project> projects = studentMapper.getProjectsFromStudent(cip);
        for (int i = 0; i < projects.size(); i++) {
            projects.get(i).setStudents(getStudents(projects.get(i).getId_project()));
            projects.get(i).setCourses(getCoursesFromProject(projects.get(i).getId_project()));
        }
        return projects;
    }

    @GetMapping("/getCoursesFromProject")
    public List<Course> getCoursesFromProject(@RequestParam(value = "id_project") int id_project) {
        return studentMapper.getCoursesFromProject(id_project);
    }

    @GetMapping("/getCourses")
    public List<Course> getCourses(@RequestParam(value = "cip") String cip) {
        return studentMapper.getCoursesFromStudent(cip);
    }

    @GetMapping("/getOpenCourses")
    public List<Course> getOpenCourses(@RequestParam(value = "cip") String cip) {
        return studentMapper.getOpenCoursesFromStudent(cip);
    }

    @GetMapping("/getTutors")
    public List<Tutor> getTutors(@RequestParam(value = "id_project") int id_project) {
        List<Tutor> tutors = studentMapper.getTutorsFromProject(id_project);
        for (int i = 0; i < tutors.size(); i++) {
            tutors.get(i).setCourseList(studentMapper.getCoursesFromTutor(tutors.get(i).getCip()));
        }
        return tutors;
    }

    @GetMapping("/getEvents")
    public List<Event> getEvents(@RequestParam(value = "id_project") int id_project) {
        return studentMapper.getEventFromProject(id_project);
    }

    @GetMapping("/getSSH")
    public String getSSH(@RequestParam(value = "cip") String cip) {
        return studentMapper.getSSHFromStudent(cip);
    }

    @GetMapping("/setSSH")
    public boolean setSSH(@RequestParam(value = "cip") String cip, @RequestParam(value = "sshKey") String sshKey) {
        studentMapper.setSSHFromStudent(cip, sshKey);
        try {
            Config config = this.gitoliteManager.getConfigManager().get();
            User newUser = config.createUser(cip);
            newUser.setKey("", sshKey);
            this.gitoliteManager.getConfigManager().apply(config);
        } catch (IOException | ServiceUnavailable | GitException | ModificationException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    @GetMapping("/getFiles")
    public List<File> getFiles(@RequestParam(value = "id_project") int id_project) {
        return studentMapper.getFilesFromProject(id_project);
    }

    @GetMapping("/getProjectFromStudentCourse")
    public Map<String, String> getProjectFromStudentCourse(@RequestParam(value = "cip") String cip,
                                                           @RequestParam(value = "sigle") String sigle) {
        HashMap<String, String> map = new HashMap<>();
        String idProject = Integer.toString(studentMapper.getProjectFromStudentCourse(cip, sigle));
        map.put("id_project", idProject);
        map.put("gitUrl", "ssh://git@" + System.getenv("GIT_SERVER_URL") + "/" + sigle + "-" + idProject);
        return map;
    }
}
