
var post                =   $('#post'),
    postAdd             =   $('#post-add'),
    postAddName         =   $('#post-add-name'),
    postEdit            =   $('#post-edit'),
    postEditId          =   $('#post-edit-id'),
    postEditName        =   $('#post-edit-name'),
    postSearchKeywords  =   $('#post-search-keywords'),
    postSearchDateType  =   $('#post-search-date-type'),
    postSearchDateFrom  =   $('#post-search-date-from'),
    postSearchDateTo    =   $('#post-search-date-to'),
    postTool            =   $('#post-tool'),
    postName,
    postDate,
    postOpt;


//浏览器改变时触发
$(window).resize(function () {
    postAdd.dialog('center');
});


//表格数据列表
post.datagrid({
    url : ThinkPHP['MODULE'] + '/Post/getList',
    //填充屏幕大小
    fit : true,
    fitColumns : true,
    //行号
    rownumbers : true,
    border : false,
    //排序
    sortName : 'create_time',
    sortOrder : 'DESC',
    //绑定id
    toolbar : '#post-tool',
    //分页
    pagination : true,
    pageSize : 10,
    pageList : [10, 20, 30, 40, 50],
    //默认第一页
    pageNumber : 1,
    columns : [[
        {
            field : 'id',
            title : '编号',
            width : 100,
            checkbox : true,
        },
        {
            field : 'name',
            title : '职位名称',
            width : 100
        },
        {
            field : 'create_time',
            title : '创建时间',
            width : 100,
            sortable : true
        }
    ]],
});
//
//
//新增面板
postAdd.dialog({
    title : '新增',
    width: 400,
    height: 190,
    iconCls : 'icon-add',
    closed: true,
    //窗口遮盖 下面的不能操作
    modal : true,
    maximizable : true,
    buttons:[
        {
            text : '保存',
            size : 'large',
            iconCls : 'icon-accept',
            handler : function ()
            {
                if (postAdd.form('validate'))
                {
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/Post/register',
                        type : 'POST',
                        data : {
                            name : $.trim(postAddName.val())
                        },
                        beforeSend : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            })
                        },
                        success : function (data)
                        {
                            $.messager.progress('close');
                            if (data > 0)
                            {
                                $.messager.show({
                                    title : '操作提示',
                                    msg : '添加成功'
                                });
                                postAdd.dialog('close');
                                post.datagrid('load');
                            } else if (data == -1) {
                                $.messager.alert('职位名称已添加', '职位名称已添加！', 'warning', function () {
                                    postAddName.textbox('textbox').select();
                                });
                            }
                        }
                    });
                }
            }
        },{
            text : '取消',
            size : 'large',
            iconCls : 'icon-cross',
            handler : function ()
            {
                postAdd.dialog('close');
            }
        }],
    onClose : function ()
    {
        //重置
        postAdd.form('reset');
        postAdd.dialog('center');
    }
});

//修改面板
postEdit.dialog({
    title : '修改面板',
    width: 400,
    height: 190,
    iconCls : 'icon-edit',
    closed: true,
    modal : true,
    maximizable : true,
    buttons:[
        {
            text : '保存',
            size : 'large',
            iconCls : 'icon-accept',
            handler : function ()
            {
                if (postEdit.form('validate'))
                {
                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/Post/update',
                        type : 'POST',
                        data : {
                            id : postEditId.val(),
                            name : $.trim(postEditName.val())
                        },
                        beforeSend : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            })
                        },
                        success : function (data)
                        {
                            $.messager.progress('close');
                            if (data > 0)
                            {
                                $.messager.show({
                                    title : '操作提示',
                                    msg : '修改成功'
                                });
                                postEdit.dialog('close');
                                post.datagrid('reload');
                            } else if (data == -1) {
                                $.messager.alert('修改失败', '职位名称已添加！', 'warning', function () {
                                    postAddName.textbox('textbox').select();
                                });
                            } else if (data == 0) {
                                $.messager.alert('尚未有任何修改', '尚未有任何修改！', 'warning', function () {
                                    postAddName.textbox('textbox').select();
                                });
                            }
                        }
                    });
                }
            }
        },{
            text : '取消',
            size : 'large',
            iconCls : 'icon-cross',
            handler : function ()
            {
                postEdit.dialog('close');
            }
        }],
    onClose : function ()
    {
        postEdit.form('reset');
        postEdit.dialog('center');
    }
});

//工具条操作
postOpt = {
    add : function ()
    {
        postAdd.dialog('open');
    },
    edit : function ()
    {
        var rows = post.datagrid('getSelections');
        if (rows.length == 1)
        {
            postEdit.dialog('open');
            $.ajax({
                url : ThinkPHP['MODULE'] + '/Post/getOne',
                type : 'POST',
                data : {
                    id : rows[0].id
                },
                beforeSend : function ()
                {
                    $.messager.progress({
                        text : '正在处理中...'
                    })
                },
                success : function (data)
                {
                    $.messager.progress('close');
                    if (data)
                    {
                        postEdit.form('load', {
                            id : data.id,
                            name : data.name
                        })
                    } else {
                        $.messager.alert('没有获取到相应数据', '没有获取到相应数据！', 'warning');
                    }
                }
            });
        } else {
            $.messager.alert('编辑只能选定一条数据', '编辑只能选定一条数据！', 'warning');
        }
    },
    remove : function ()
    {
        var rows = post.datagrid('getSelections');
        if (rows.length > 0)
        {
            $.messager.confirm('确认删除', '确认删除所选的 <strong>' + rows.length + '</strong> 条记录吗？', function (flag) {
                if (flag) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i ++) {
                        ids.push(rows[i].id);
                    }

                    $.ajax({
                        url : ThinkPHP['MODULE'] + '/Post/remove',
                        type : 'POST',
                        data : {
                            ids : ids.join(',')
                        },
                        beforeSend : function ()
                        {
                            $.messager.progress({
                                text : '正在处理中...'
                            })
                            //post.datagrid('loading');
                        },
                        success : function (data)
                        {
                            $.messager.progress('close');
                            //post.datagrid('loaded');
                            if (data)
                            {
                                //删除成功刷新表
                                post.datagrid('reload');
                                $.messager.show({
                                    title : '删除成功',
                                    msg : data + '条数据被成功删除！'
                                })
                            } else {
                                $.messager.alert('删除失败', '没有删除任何数据！', 'warning');
                            }
                        }
                    });
                }
            });
        } else {
            $.messager.alert('删除不能为空', '删除不能为空！', 'warning');
        }
    },
    redo : function ()
    {
        post.datagrid('unselectAll');
    },
    reload : function ()
    {
        post.datagrid('reload');
    },
    search : function ()
    {
        if (postTool.form('validate'))
        {
            post.datagrid('load', {
                keywords : postSearchKeywords.textbox('getValue'),
                dateType : postSearchDateType.combobox('getValue'),
                dateFrom : postSearchDateFrom.datebox('getValue'),
                dateTo : postSearchDateTo.datebox('getValue')
            });
        }
    },
    reset : function ()
    {
        postSearchKeywords.textbox('clear');
        postSearchDateType.combobox('clear').combobox('disableValidation');
        postSearchDateFrom.datebox('clear');
        postSearchDateTo.datebox('clear');
        this.search();
        post.datagrid('sort', {
            sortName : 'create_time',
            sortOrder : 'DESC'
        });
    }
};
//
//
///*查询字段区域*/
//postSearchKeywords.textbox({
//    width : 150,
//    prompt : '职位'
//});
//
////时间类型旋转
//postSearchDateType.combobox({
//    width : 100,
//    editable : false,
//    prompt : '时间类型',
//    data : [{
//        id : 'create_time',
//        text : '创建时间'
//    }],
//    valueField : 'id',
//    textField : 'text',
//    required : true,
//    novalidate : true,
//    panelHeight : 'auto',
//    tipPosition : 'left',
//    missingMessage : '请选择时间类型'
//});
//
////查询时间对象
//postDate = {
//    width : 100,
//    editable : false,
//    onSelect : function ()
//    {
//        if (postSearchDateType.combobox('enableValidation').combobox('isValid') == false)
//        {
//            postSearchDateType.combobox('showPanel');
//        }
//    }
//};
//
////起始时间
//postDate.prompt = '起始时间';
//postSearchDateFrom.datebox(postDate);
//
////结束时间
//postDate.prompt = '结束时间';
//postSearchDateTo.datebox(postDate);
//
//
///*表单字段区域*/
//
//
//职位名称
postName = {
    width : 220,
    height : 32,
    required : true,
    validType : 'length[2,20]',
    missingMessage : '请输入职位名称',
    invalidMessage : '职位名称2-20位之间'
};

//新增职位
postAddName.textbox(postName);

//修改职位
postEditName.textbox(postName);
