package com.diploma.git.backend;

import com.diploma.git.backend.gitolite.GitoliteManager;
import com.diploma.git.backend.mapper.TeamMapper;
import com.diploma.git.backend.model.Project;
import com.diploma.git.backend.model.Student;
import gitolite.manager.exceptions.GitException;
import gitolite.manager.exceptions.ModificationException;
import gitolite.manager.exceptions.ServiceUnavailable;
import gitolite.manager.models.Config;
import gitolite.manager.models.ConfigManager;
import gitolite.manager.models.Permission;
import gitolite.manager.models.Repository;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/team")
@CrossOrigin
public class TeamController {
    private GitoliteManager gitoliteManager;
    @Autowired
    TeamMapper teamMapper;

    @Autowired
    public TeamController(GitoliteManager gitoliteManager){
        this.gitoliteManager = gitoliteManager;
    }

    @GetMapping("/getProjects")
    public List<Project> getProjects(@RequestParam(value = "sigle") String sigle) {
        List<Project> teams = teamMapper.getProjectsFromCourse(sigle);
        for(int i = 0; i < teams.size(); i++) {
            teams.get(i).setStudents(teamMapper.getStudentsFromProject(teams.get(i).getId_project()));
            teams.get(i).setMax_member(teamMapper.getTeamSizeFromCourse(sigle));
        }
        return teams;
    }

    @GetMapping("/registerInProject")
    public boolean registerInProject(@RequestParam(value = "sigle") String sigle,
                                  @RequestParam(value = "id_project") int id_project,
                                  @RequestParam(value = "cip") String cip)  {
        if (isInProject(sigle, cip))
            return false;
        try {
            Config config = this.gitoliteManager.getConfigManager().get();
            Repository repo = config.getRepository(Integer.toString(id_project));
            repo.setPermission(config.getUser(cip), Permission.ALL);
            repo.setPermission(config.getUser("admin"), Permission.ALL);
            this.gitoliteManager.getConfigManager().apply(config);
        } catch (IOException | ServiceUnavailable | GitException | ModificationException e) {
            throw new RuntimeException(e);
        }
        teamMapper.registerStudentInProject(id_project, cip);
        return true;
    }

    @GetMapping("/isInProject")
    public boolean isInProject(@RequestParam(value = "sigle") String sigle,
                               @RequestParam(value = "cip") String cip) {
        List<Project> teams = getProjects(sigle);
        for (int i = 0; i < teams.size(); i++) {
            List<Student> students = teams.get(i).getStudents();
            for (int j = 0; j < students.size(); j++)
                if (students.get(i).getCip().equals(cip))
                    return true;
        }
        return false;
    }
}
