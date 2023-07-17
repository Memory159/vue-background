// 平台属性管理模块请求文件
import request from '@/utils/request'

// 获取一级分类数据接口
// /admin/product/getCategory1   method:get 
export const reqCartgory1List = () => request({ url: `/admin/product/getCategory1`, method: 'get' });

// 获取二级分类数据接口
// /admin/product/getCategory2/{category1id}