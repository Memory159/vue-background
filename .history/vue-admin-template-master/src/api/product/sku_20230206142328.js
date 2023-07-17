// SKU管理模块请求文件
import request from '@/utils/request';

// 获取图片的接口
// /admin/product/spuImageList/{spuId}   method:get
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' });

// 获取属性值列表数据的接口