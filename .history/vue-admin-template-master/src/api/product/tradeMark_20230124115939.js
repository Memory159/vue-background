// 这个模块主要获取的是品牌管理的数据的模块

import request from '@/utils/request';

//获取品牌列表接口
// /admin/product//{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/acl/user/{page}/{limit}` });