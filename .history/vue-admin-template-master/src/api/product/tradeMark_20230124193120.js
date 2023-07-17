// 这个模块主要获取的是品牌管理的数据的模块

import request from '@/utils/request';

//获取品牌列表接口
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' });

// 处理添加品牌
// 新增品牌: /admin/product/baseTrademark/save  post请求  携带两个参数：品牌名称、品牌Logo
// 切记：对于新增的品牌，给服务器传递数据，不需要传递ID，ID是由服务器生成的

// 修改品牌: /admin/product/baseTrademark/update  put请求  携带三个参数：品牌ID、品牌名称、品牌Logo
// 切记：对于修改某一个品牌的操作，前端携带的参数需要带上ID，你需要告诉服务器修改的是哪一个品牌

export const reqAddOrUpdateTradeMark = (tradeMark) => {
    //带给服务器数据携带ID----修改
    if (tradeMark.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark });
    } else {

    }
}