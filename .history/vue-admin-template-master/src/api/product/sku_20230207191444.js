// SKU管理模块请求文件
import request from '@/utils/request';

// 获取图片的接口
// /admin/product/spuImageList/{spuId}   method:get
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' });

// 获取销售属性数据的接口
// /admin/product/spuSaleAttrList/{spuId}   method:get
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' });

// 获取平台属性数据的接口
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}   method:get
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' });

// sku列表的接口
// /admin/product/list/{page}/{limit}   method:get
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' });