package com.njxzc.springboot.service;

import com.njxzc.springboot.mapper.CountryMapper;
import com.njxzc.springboot.pojo.Country;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    @Autowired
    CountryMapper countryMapper;

    public List<Country> query(){
        return countryMapper.queryAll();
    }
}
