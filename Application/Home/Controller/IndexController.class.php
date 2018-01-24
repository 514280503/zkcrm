<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller
{
    public function index(){
        //$this->getTree();exit();
        $this->display();
    }

    public function getTree()
    {
        $this->ajaxReturn(D('Nav')->getTree());
    }
}