// 平台属性管理模块请求文件
import request from '@/utils/request'

// 获取一级分类数据接口
// /admin/product/getCategory1   method:get 
export const reqCartgory1List = () => request({ url: `/admin/product/getCategory1`, method: 'get' });

// 获取二级分类数据接口
// /admin/product/getCategory2/{category1Id}   method:get
export const reqCartgory2List = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' });

// 获取三级分类数据接口
// /admin/product/getCategory3/{category2Id}   method:get
export const reqCartgory3List = (category2Id) => request({ url: `/admin/product/getCategory2/${category2Id}`, method: 'get' });