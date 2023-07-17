// 这个模块主要获取的是品牌管理的数据的模块

import request from '@/utils/request';

//获取品牌列表接口
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' });

// 处理添加品牌
// 新增品牌: /admin/product/baseTrademark/save  post请求  携带两个参数：品牌名称、品牌Logo
// 切记：对于新增的品牌，给服务器传递数据，不需要