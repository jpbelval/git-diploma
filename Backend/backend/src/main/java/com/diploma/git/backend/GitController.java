package com.diploma.git.backend;

import com.diploma.git.backend.mapper.ProjectMapper;
import com.diploma.git.backend.mapper.StudentMapper;
import com.diploma.git.backend.model.File;
import com.diploma.git.backend.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/git")
@CrossOrigin

public class GitController {

    @Autowired
    StudentMapper studentMapper;
    @Autowired
    ProjectMapper projectMapper;

    @GetMapping("/getRepoFilesInfo")
    public List<File> getRepoFilesInfo(@RequestParam(value = "id_project") String id_project) {
        
        return null;
    }
    @GetMapping("/downloadRepoFiles")
    public List<File> downloadRepoFiles(@RequestParam(value = "id_project") String id_project) {
        return null;
    }

    @GetMapping("/addUser")
    public void addUser(@RequestParam(value = "cip") String cip,@RequestParam(value = "id_project") String id_project) {
    }

    @GetMapping("/submitRepo")
    public void submitRepo(@RequestParam(value = "id_project") String id_project) {
    }

    @GetMapping("/setSSHKey")
    public void setSSHKey(@RequestParam(value = "cip") String cip,@RequestParam(value = "sshKey") String sshKey) {
    }
}
