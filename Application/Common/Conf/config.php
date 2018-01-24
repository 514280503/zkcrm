<?php
return array(
	//'配置项'=>'配置值'
    //'配置项'=>'配置值'
    /* 数据库设置 */
    'DB_TYPE'               =>  'mysql',     // 数据库类型
    'DB_HOST'               =>  '127.0.0.1', // 服务器地址
    'DB_NAME'               =>  'zkcrm',          // 数据库名
    'DB_USER'               =>  'root',      // 用户名
    'DB_PWD'                =>  'root',          // 密码
    'DB_PORT'               =>  '3306',        // 端口
    'DB_PREFIX'             =>  'zkcrm_',    // 数据库表前缀
    //默认模板
    'DEFAULT_THEME'         =>  'Default',
    //模版变量替换
    'TMPL_PARSE_STRING'  =>array(
        '__EASYUI__' => __ROOT__.'/Public/easyui',
        '__EDITOR__'=>__ROOT__.'/Public/kindeditor',
        '__CSS__' => __ROOT__.'/Public/css',
        '__IMG__' => __ROOT__.'/Public/img',
        '__JS__' => __ROOT__.'/Public/js',
    ),
    //URL访问模式
    'URL_MODEL'             =>  2,
    //拒绝强制小写
    'DB_PARAMS'             =>  array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL),
);