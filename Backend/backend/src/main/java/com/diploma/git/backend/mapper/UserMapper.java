package com.diploma.git.backend.mapper;

import com.diploma.git.backend.model.Users;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
//Deprecated
@Mapper
public interface UserMapper {

    @Select("select * from gdUser")
    List<Users> findAll();
}
