<?php
namespace Home\Model;

use Think\Model;

class NavModel extends Model
{
    public function getTree()
    {
        $map['nid'] = 0;
        //$map['id'] = array('in', $ids);
        //$map['_logic'] ='or';

        //得到所有的节点 ->where($map)
        $object = $this->field('id,text,url,iconCls,nid')->select();

        //声明树数组
        $nav = $tree = array();

        //将所有主节点筛选出来
        foreach ($object as $key=>$value)
        {
            if ($value['nid'] == 0)
            {
                $tree[] = $value;
            }
        }

        //将所有子节点合并到对应的主节点中
        foreach ($tree as $treeKey=>$treeValue)
        {
            foreach ($object as $objectKey=>$objectValue)
            {
                if ($treeValue['id'] == $objectValue['nid'])
                {
                    $tree[$treeKey]['children'][] = $objectValue;
                }
            }
        }
        return $tree;
        //剔除掉空的主导航
//        foreach ($tree as $treeKey=>$treeValue) {
//            if ($tree[$treeKey]['children']) {
//                $nav[] = $tree[$treeKey];
//            }
//        }
//
//
//        return $nav;
    }
}