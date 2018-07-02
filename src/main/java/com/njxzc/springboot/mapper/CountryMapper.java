package com.njxzc.springboot.mapper;

import com.njxzc.springboot.pojo.Country;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CountryMapper {

    @Select("select * from country")
    List<Country> queryAll();
}