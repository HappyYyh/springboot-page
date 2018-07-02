package com.njxzc.springboot.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.njxzc.springboot.pojo.Country;
import com.njxzc.springboot.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class CountryController {

    @Autowired
    CountryService countryService;

    @RequestMapping("/")
    public String Index(){
        return "index";
    }

    @RequestMapping("/query")
    @ResponseBody
    public PageInfo query(@RequestParam(value = "pn",defaultValue = "1") Integer pageNum){
        //startPage紧跟的方法会分页
        PageHelper.startPage(pageNum,5);
        List<Country> list = countryService.query();
        //封装了详细的分页信息，包括查询出来的数据，可以传入连续显示的页数
        PageInfo pageInfo = new PageInfo(list,5);
        return  pageInfo;
    }

}
