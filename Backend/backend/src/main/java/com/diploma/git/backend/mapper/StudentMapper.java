package com.diploma.git.backend.mapper;

import com.diploma.git.backend.model.Project;
import com.diploma.git.backend.model.Student;
import jakarta.websocket.server.PathParam;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface StudentMapper {
    @Select("SELECT s.cip, s.lastname, s.firstname, s.email " +
            "FROM student s " +
            "INNER JOIN student_project " +
            "ON s.cip = student_project.cip " +
            "WHERE student_project.id_project = #{id_project} ")
    List<Student> getStudentsFromProject(@PathParam("id_project") String id_project);

    @Select("SELECT p.id_project " +
            "FROM project p " +
            "INNER JOIN student_project " +
            "ON p.id_project = student_project.id_project " +
            "WHERE student_project.cip = #{cip} ")
    List<Project> getProjectsFromStudent(@PathParam("cip") String cip);
}
