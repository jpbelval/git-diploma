package com.diploma.git.backend;

import com.diploma.git.backend.model.Course;
import com.diploma.git.backend.model.Tutor;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api/tutor")
public class TutorController {
    @GetMapping("/getTutor")
    public Tutor getTutor(@RequestParam(value = "cip") String cip) {
        Tutor tutor = new Tutor();
        tutor.setCip(cip);
        tutor.setFirstname("Biggus");
        tutor.setLastname("Maccus");
        return tutor;
    }

    @GetMapping
    public Course getCourse(@RequestParam(value = "id") int id) {
        return new Course();
    }

}
