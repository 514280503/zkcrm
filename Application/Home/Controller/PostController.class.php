<?php
namespace Home\Controller;
use Think\Controller;
class PostController extends Controller
{
    public function index(){
        //D()->getList();exit();
        $this->display();
    }

    //获取列表
    public function getList()
    {
        if(IS_AJAX)
        {
            $this->ajaxReturn(D('Post')->getList(I('post.page'),I('post.rows'),I('post.sort'),I('post.order')));
        }else
        {
            $this->error('非法操作');
        }

    }
    //新增职位
    public function register()
    {
        if(IS_AJAX)
        {
           echo D('Post')->register(I('post.name'));
        }else
        {
            $this->error('非法操作');
        }
    }
    //修改职位
    public function update()
    {
        if(IS_AJAX)
        {
            echo D('Post')->update(I('post.id'),I('post.name'));
        }else
        {
            $this->error('非法操作');
        }
    }

    //获取职位
    public function getOne()
    {
        if(IS_AJAX)
        {
            $this->ajaxReturn(D('Post')->getOne(I('post.id')));
        }else
        {
            $this->error('非法操作');
        }
    }

    public function remove()
    {
        if(IS_AJAX)
        {
            echo D('Post')->remove(I('post.ids'));
        }else
        {
            $this->error('非法操作');
        }
    }
}