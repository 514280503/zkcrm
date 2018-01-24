<?php
namespace Home\Model;

use Think\Model;

class PostModel extends Model
{
    //自动验证
    protected  $_validate = array(
      array('name','2,20','职位名称大于2位小于20位',self::VALUE_VALIDATE,'length',self::MODEL_BOTH),
      array('name','','职位已存在',self::VALUE_VALIDATE,'unique',self::MODEL_BOTH),
    );
    //获取所有职位
    public function getList($page,$rows,$sort,$order)
    {
        $list = $this->field('id,name,create_time')
                     ->order(array($sort=>$order))
                     ->limit(($rows*($page-1)),$rows)
                     ->select();
        return array(
            'total'=>$this->count(),
            'rows'=> $list ? $list : '',
        );
    }

    //新增职位
    public function register($name)
    {
        $addData = array(
            'name'=>$name,
            'create_time'=>getTime(),
        );

        if($this->create($addData))
        {
            $id = $this->add($addData);
            return $id ? $id : 0;
        }else
        {
            if($this->getError()=='职位已存在')
            {
                return -1;
            }
            return $this->getError();
        }
    }
    //获取数据
    public function getOne($id)
    {
        $map['id'] = $id;
        return $this->field('id,name')->where($map)->find();
    }

    //修改职位
    public function update($id,$name)
    {
        $updateData = array(
            'id'=>$id,
            'name'=>$name,
        );

        if($this->create($updateData))
        {
            $id = $this->save($updateData);
            return $id ? $id : 0;
        }else
        {
            if($this->getError()=='职位已存在')
            {
                return -1;
            }
            return $this->getError();
        }
    }
    //删除职位
    public function remove($ids)
    {
        return $this->delete($ids);
    }

}