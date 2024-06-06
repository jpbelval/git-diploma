package com.diploma.git.backend.mapper;

import com.diploma.git.backend.model.Project;
import com.diploma.git.backend.model.Student;
import jakarta.websocket.server.PathParam;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TeamMapper {
    @Select("SELECT c.sigle " +
            "FROM class_project " +
            "WHERE c.sigle = #{sigle} ")
    List<Project> getProjectsFromCourse(@PathParam("sigle") String sigle);

    @Select("SELECT s.cip, s.lastname, s.firstname, s.email " +
            "FROM student s " +
            "INNER JOIN student_project " +
            "ON s.cip = student_project.cip " +
            "WHERE student_project.id_project = #{id_project} ")
    List<Student> getStudentsFromProject(@PathParam("id_project") String id_project);

    @Insert("INSERT INTO student_project VALUES (#{cip}, #{id_project})")
    void registerStudentInProject(@PathParam("id_project") String id_project,
                                  @PathParam("cip") String cip);
}
