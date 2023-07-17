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

// 修改SPU|添加SPU：对于修改或者添加，携带给服务器参数大致一样，唯一的区别就是携带的参数是否带Id
export const reqAddOrUpdateSpu = (spuInfo) => {
    // 携带的参数带有id----修改spu
    if (spuInfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo });
    } else {
        // 携带的参数不带id----添加spu
        return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo });
    }
}

// 删除SPU列表的接口
// /admin/product/deleteSpu/{spuId}   method:delete 
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' });