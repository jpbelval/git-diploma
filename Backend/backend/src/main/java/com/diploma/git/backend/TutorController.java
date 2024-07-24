package com.diploma.git.backend;

import com.diploma.git.backend.gitolite.GitoliteManager;
import com.diploma.git.backend.mapper.ProjectMapper;
import com.diploma.git.backend.mapper.StudentMapper;
import com.diploma.git.backend.mapper.TutorMapper;
import com.diploma.git.backend.model.*;
import gitolite.manager.exceptions.GitException;
import gitolite.manager.exceptions.ModificationException;
import gitolite.manager.exceptions.ServiceUnavailable;
import gitolite.manager.models.Config;
import gitolite.manager.models.ConfigManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/api/tutor")
public class TutorController {
    @Autowired
    private TutorMapper tutorMapper;
    @Autowired
    private ProjectMapper projectMapper;

    private GitoliteManager gitoliteManager;

    @Autowired
    public TutorController(GitoliteManager gitoliteManager){
        this.gitoliteManager = gitoliteManager;
    }
    

    @GetMapping("/getStudents")
    public List<Student> getStudents(@RequestParam(value = "id_project") int id_project) {
        List<Student>  students = tutorMapper.getStudentsFromProject(id_project);
        for (int i = 0; i < students.size(); i++) {
            students.get(i).setProjets(tutorMapper.getProjectsFromStudent(students.get(i).getCip()));
        }
        return students;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/getCourses")
    public List<Course> getCourses(@RequestParam(value = "cip") String cip) {
        return tutorMapper.getCoursesFromTutor(cip);
    }

    @GetMapping("/getProjects")
    public List<Project> getProjects(@RequestParam(value = "sigle") String sigle) {
        List<Project> projects = tutorMapper.getProjectsFromCourse(sigle);
        for (Project p : projects) {
            List<Student> s =  projectMapper.getProjectMembers(p.getId_project());
            p.setStudents(s);
        }
        return projects;
    }

    @GetMapping("/getEvents")
    public List<Event> getEvents(@RequestParam(value = "id_project") int id_project) {
        return tutorMapper.getEventFromProject(id_project);
    }

    @GetMapping("/getSSH")
    public String getSSH(@RequestParam(value = "cip") String cip) {
        return tutorMapper.getSSHFromTutor(cip);
    }

    @GetMapping("/getFiles")
    public List<File> getFiles(@RequestParam(value = "id_project") int id_project) {
        return tutorMapper.getFilesFromProject(id_project);
    }

    @GetMapping("/getCourseEndDate")
    public String getCourseEndDate(@RequestParam(value = "sigle") String sigle) {
        return tutorMapper.getCourseEndDate(sigle);
    }

    @GetMapping("/setEndDate")
    public boolean endateBrise(@RequestParam(value = "sigle") String sigle,
                              @RequestParam(value = "remise") String end_date) {
        //tutorMapper.setEndDate(sigle, end_date);
        return true;
    }

    @GetMapping("/getNumberStudents")
    public int getNumberStudents(@RequestParam(value = "sigle") String sigle) {
        return tutorMapper.getNumberStudentsCourse(sigle);
    }

    @GetMapping("/createTeams")
    public boolean setupProjet(@RequestParam(value = "teamSize") int teamSize,
                            @RequestParam(value = "endDate") String endDate,
                            @RequestParam(value= "sigle") String sigle) {
        int nbStudent = getNumberStudents(sigle);
        int teams = nbStudent / teamSize;

        ConfigManager gitManager = this.gitoliteManager.getConfigManager();
        try {
            Config config = gitManager.get();
            int currentTeamIterator = tutorMapper.getLastProjectId();
            for (int i = 0; i < getNumberStudents(sigle) / teamSize; i++) {

                currentTeamIterator++;
                String repoName = sigle + "-" + Integer.toString(currentTeamIterator);

                if (config.getRepository(repoName) == null){
                    config.createRepository(repoName);
                }

                tutorMapper.createTeams(sigle);
            }
            gitManager.apply(config);
            tutorMapper.setEndDate(sigle, endDate, teamSize);
        } catch (IOException | ServiceUnavailable | GitException | ModificationException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    @GetMapping("/getCourseWithNoTeams")
    public List<Course> getCourseWithNoTeams() {
        return tutorMapper.getCourseWithNoTeams();
    }

    @GetMapping("/getCoursesWithNoTeamsFromTutor")
    public List<Course> getCoursesWithNoTeamsFromTutor(@RequestParam(value = "cip") String cip) {
        return tutorMapper.getNoTeamsFromTutor(cip);
    }

    @GetMapping("/getCourseDetails")
    public Course getCourseDetails(@RequestParam(value = "sigle") String sigle) {
        return tutorMapper.getSingleCourseDetails(sigle);
    }
    //@GetMapping("/")

}
