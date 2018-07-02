$(function () {
    //页面加载时显示首页
    query(1);
});

//根据传入的页码号，进行查询
function query(pn) {
    $.ajax({
        type:'GET',
        url:'/query',
        data:{pn:pn},
        success:function (result) {
            //1、解析并显示数据
            show_table(result);
            //2、解析并显示分页信息
            show_pageInfo(result);
            //3、解析并显示分页条
            show_pageNav(result);
        }
    });
}

//表格数据显示
function show_table(result) {
    $("#table tbody").empty();
    //对result里面的list进行遍历
    $.each(result.list,function (index,country) {
        //addClass添加样式
        //构建表格元素
        var countryID = $("<td></td>").append(country.id);
        var countryName = $("<td></td>").append(country.countryname);
        var countryCode = $("<td></td>").append(country.countrycode);
        var editBtn = $("<button></button>").append("编辑").addClass("btn btn-primary btn-sm");
        var delBtn = $("<button></button>").append("删除").addClass("btn btn-danger btn-sm");
        var btnTd = $("<td></td>").append(editBtn).append(" ").append(delBtn);
        //append 方法执行完成以后还是返回原来的元素,appendTo添加到某个元素
        $("<tr></tr>").append(countryID).append(countryName).append(countryCode)
                      .append(btnTd)
                      .appendTo($("#table tbody"));
    });
}

//分页信息显示
function show_pageInfo(result) {
    //先清空所有
    $("#show_pageInfo").empty();
    $("#show_pageInfo").append("当前第<Strong>"+result.pageNum+"</Strong>页," +
                               "总共<Strong>"+result.pages+"</Strong>页," +
                               "总共<Strong>"+result.total+"</Strong>条记录");
}

//分页条数据显示
function show_pageNav(result) {
    $("#show_pageNav").empty();
    var ul = $("<ul></ul>").addClass("pagination");
    //构建分页条元素
    var firstPageLi = $("<li></li>").append($("<a></a>").attr("href","#").append("首页"));
    var prePageLi   = $("<li></li>").append($("<a></a>").attr("href","#").append("&laquo;"));
    //如果已经是首页了，那么让其不可选中
    if(result.hasPreviousPage == false){
        firstPageLi.addClass("disabled");
        prePageLi.addClass("disabled");
    }else {//如果不是首页，则可以让其点击前一页和首页
        //首页点击事件
        firstPageLi.click(function () {
            query(1) ;
        });
        prePageLi.click(function () {
           query(result.pageNum - 1);
        });
    }
    var nextPageLi  = $("<li></li>").append($("<a></a>").attr("href","#").append("&raquo;"));
    var lastPageLi  = $("<li></li>").append($("<a></a>").attr("href","#").append("末页"));
    //如果已经是末页了，那么让其不可选中
    if(result.hasNextPage == false){
        nextPageLi.addClass("disabled");
        lastPageLi.addClass("disabled");
    }else {//如果不是，则可以让其点击下一页和尾页
        nextPageLi.click(function () {
            query(result.pageNum + 1);
        });
        //末页点击事件
        lastPageLi.click(function () {
            query(result.pages)
        });
    }

    //将首页和前一页放入ul中
    ul.append(firstPageLi).append(prePageLi);

    //循环显示页码号
    $.each(result.navigatepageNums,function (index,Num) {
        var numLi = $("<li></li>").append($("<a></a>").attr("href","#").append(Num));
        //如果当前页码就是选中的页码，就让其高亮
        if(result.pageNum == Num){
            numLi.addClass("active");
        }
        //页码号点击查询
        numLi.click(function () {
            query(Num)
        });
        //将页码号放入ul中
        ul.append(numLi);
    });

    //将下一页和末页放入ul中
    ul.append(nextPageLi).append(lastPageLi);
    //将ul加入到nav元素中，并放入show_pageNav中
    $("<nav></nav>").append(ul).appendTo($("#show_pageNav"));
}