//内容切换
$('#tabs').tabs({
    fit : true,
    border : false,
    onLoad : function ()
    {
        //非火狐浏览器屏蔽tab-loading
        if (navigator.userAgent.indexOf('Firefox') < 0)
        {
            $('.tabs-loading').remove();
        }
    },
    onContextMenu : function (e, title, index)
    {
        e.preventDefault();

        var menu = $('#menu'),
            _this = this;

        //右击弹出菜单
        menu.menu('show', {
            top : e.pageY,
            left : e.pageX
        });

        //将起始页禁用关闭
        if (index == 0)
        {
            menu.menu('disableItem', $('.closecur')[0]);
        } else {
            menu.menu('enableItem', $('.closecur')[0]);
        }

        //三个关闭方法
        menu.menu({
            onClick : function (item)
            {
                var tablist = $(_this).tabs('tabs');

                switch (item.text)
                {
                    case '关闭' :
                        $(_this).tabs('close', index);
                        break;

                    case '关闭所有' :
                        for (var i = tablist.length; i > 0; i --)
                        {
                            $(_this).tabs('close', i);
                        }
                        break;

                    case '关闭其他所有' :
                        for (var i = tablist.length; i > 0; i --)
                        {
                            if (i != index)
                            {
                                $(_this).tabs('close', i);
                            }
                        }
                        $(_this).tabs('select', 1);
                        break;
                }
            }
        });

    }
})

//左侧导航
$('#tree').tree({
    url: ThinkPHP['MODULE'] + '/Index/getTree',
    lines : true,
    animate : true,
    onClick : function (node)
    {
        var tabs = $('#tabs');

        //判断是否有链接
        if (node.url)
        {
            //判断是否打开标签页
            if (tabs.tabs('exists', node.text))
            {
                //直接选定
                tabs.tabs('select', node.text);
            } else {
                switch (node.text)
                {

                    case '登录帐号' :
                        $('#user-add').dialog('destroy');
                        $('#user-edit').dialog('destroy');
                        break;
                    case '职位部门' :
                        $('#post-add').dialog('destroy');
                        $('#post-edit').dialog('destroy');
                        break;
                    case '员工档案' :
                        $('#staff-add').dialog('destroy');
                        break;
                }

                //添加选项卡
                tabs.tabs('add', {
                    title : node.text,
                    closable : true,
                    iconCls : node.iconCls,
                    href : ThinkPHP['MODULE'] + '/' + node.url
                });
            }
        }


    }
})


