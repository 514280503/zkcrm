<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ZKCRM</title>
	<link rel="stylesheet" href="/Public/easyui/themes/bootstrap/easyui.css">
    <link rel="stylesheet" href="/Public/easyui/themes/icon.css">
    <link rel="stylesheet" href="/Public/css/index.css">
    <script>
        var ThinkPHP = {
            'MODULE' : '/Home',
        };
    </script>
</head>
<body class="easyui-layout">

<div data-options="region:'north',split:true,border:false" class="layout-north">
    <div class="logo">
        <img src="/Public/img/logo.png" alt="CRM客户关系管理系统">
    </div>
    <div class="info">
        您好，<?php echo session('admin')['staff_name'];?> <?php echo session('admin')['post'];?>！
        <a href="javascript:void(0)" class="easyui-linkbutton" id="btn-edit" iconCls="icon-edit">修改密码</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" id="btn-logout" iconCls="icon-remove">登录系统</a>
    </div>
    <!--修改密码-->
    <!-- <form id="edit" class="easyui-dialog">
        <input type="hidden" id="edit-id" value="<?php echo session('admin')['id'];?>">
        <table class="form-table" style="max-width: 420px;">
            <tbody>
            <tr>
                <td class="label">
                    <label for="edit-accounts" class="form-label">帐号：</label>
                </td>
                <td class="input">
                    <input type="text" id="edit-accounts" class="easyui-textbox" value="<?php echo session('admin')['accounts'];?>">
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="edit-password" class="form-label">密码：</label>
                </td>
                <td class="input">
                    <input type="password" id="edit-password" class="easyui-textbox">
                </td>
            </tr>
            <tr>
                <td class="label">
                    <label for="edit-notpassword" class="form-label">确认密码：</label>
                </td>
                <td class="input">
                    <input type="password" id="edit-notpassword" class="easyui-textbox">
                </td>
            </tr>
            </tbody>
        </table>
    </form> -->
</div>

<!--软件左侧导航-->
<div data-options="region:'west',split:true,title:'导航',iconCls:'icon-world'" class="layout-west">
    <div id="tree"></div>
</div>

<!--软件主体部分-->
<div data-options="region:'center'" class="layout-center">
    <div id="tabs">
        <div title="起始页" iconCls="icon-house">
            <p>欢迎来到ZKCRM客户关系管理系统！</p>
        </div>
    </div>
</div>

<!--软件底部-->
<div data-options="region:'south',split:true" class="layout-south">
    ©2017-2018 ZKCRM. Powered by ThinkPHP3.2.3 and EasyUI.
</div>


<!--右击菜单-->
<div id="menu" class="easyui-menu">
    <div class="closecur">关闭</div>
    <div class="closeall">关闭所有</div>
    <div class="closeother" iconCls="icon-cross">关闭其他所有</div>
</div>

<!--details容器-->
<div id="details"></div>

<script type="text/javascript" src="/Public/easyui/jquery.min.js"></script>
<script type="text/javascript" src="/Public/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="/Public/easyui/locale/easyui-lang-zh_CN.js"></script>
<script src="/Public/js/index.js"></script>
</body>
</html>