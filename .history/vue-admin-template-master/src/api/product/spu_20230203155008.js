// SPU管理模块请求文件
import request from '@/utils/request';

// 获取SPU列表数据的接口
// /admin/product/{page}/{limit}   method:get   page   limit  category3Id
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, methos: 'get', params: { category3Id } });

// 获取SPU信息
// /admin/product/getSpuById/{spuId}   method:get
export const reqSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, methos: 'get' });

// 获取品牌的信息
// /admin/product/baseTrademark/getTrademarkList   method:get
export const reqTradeMarkList = () => request({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' });

// 获取SPU图标的接口
// /admin/product/spuImageList/{spuId}   method:get
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' });

// 获取平台全部销售属性-----整个平台销售属性一个三个
// /admin/product/baseSaleAttrList   method:get
export const reqBaseSaleAttrList = () => request({ url: 'admin/product/baseSaleAttrList', method: 'get' });