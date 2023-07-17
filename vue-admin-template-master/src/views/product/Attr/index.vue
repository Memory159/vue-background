<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格：显示平台属性 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            prop="attrName"
            width="150"
          ></el-table-column>
          <el-table-column label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 0px 5px 0px 20px"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          border
          style="margin: 20px 20px"
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}"> 
              <!-- 气泡确认框 -->
              <el-popconfirm :title="`确定要删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="margin: 0px 20px" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接收平台属性的字段
      attrList: [],
      // 这个属性控制table表格显示与隐藏
      isShowTable: true,
      // 收集增加属性|修改属性使用的
      attrInfo: {
        attrName: "", // 属性名
        attrValueList: [
          // 属性值，因为属性值可以有多个，所以用数组，每一个属性值都是一个对象
        ],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    // 三级联动的自定义事件的回调
    getCategoryId({ categoryId, level }) {
      // 区分三级分类响应的id，以及父组件进行存储
      if (level == 1) {
        this.category1Id = categoryId;
      } else if (level == 2) {
        this.category2Id = categoryId;
      } else {
        // 代表三级分类的id有了
        this.category3Id = categoryId;
        // 发请求获取平台属性的数据
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    // 当用户确定三级分类的数据时，可以向服务器发送请求获取平台属性进行展示
    async getAttrList() {
      // 解构出分类的id
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        // 向属性值的数组里面添加元素
        // attrId:是你响应属性的id，目前而言我们是添加属性的操作，还没有相应的属性的id，目前而言带给服务器的id为undefined
        // valueName:相应的属性值的名称
        attrId: this.attrInfo.id, // 对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值（新增属性值的时候，需要把已有属性的id带上）
        valueName: "",
        flag: true,
        // flag属性：给每一个属性添加一个标记flag，用户切换查看模式与编辑模式。好处：每一个属性值可以控制自己的模式切换
        // 当前flag属性，响应式数据（数据变化视图跟着变化）
      });
      this.$nextTick(() => {
        // 永远是给最后一个新的属性值加聚焦，所以需要长度减一
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性按钮的回调
    addAttr() {
      //  切换table显示与隐藏
      this.isShowTable = false;
      // 清除数据并且收集三级分类的id
      this.attrInfo = {
        attrName: "", // 属性名
        attrValueList: [
          // 属性值，因为属性值可以有多个，所以用数组，每一个属性值都是一个对象
        ],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    // 修改某一个属性的按钮回调
    updateAttr(row) {
      // 切换table的显示与隐藏
      this.isShowTable = false;
      // 将选中的属性赋值给attrInfo
      // 由于数组结构中存在对象里面套数组，数组里面套对象，因此需要使用深拷贝解决此类问题
      this.attrInfo = cloneDeep(row);
      // 在修改某一个属性的时候，将相应的属性值元素添加上flag这个标记
      this.attrInfo.attrValueList.forEach((item) => {
        // item.flag = false;
        // 这样书写也会给属性值添加flag字段，但是视图不会跟着变化，因为flag不是响应式数据
        // 第一个参数：对象  第二个参数：添加新的响应式属性   第三个参数：新的属性的属性值
        this.$set(item, "flag", false);
      });
    },
    // 失去焦点的事件---切换为查看模式，展示span
    toLook(row) {
      // 如果属性值为空，不能作为属性值，需要给用户提示，让他输入一个其他的值
      if (row.valueName.trim() == "") {
        this.$message("请输入一个正常的属性值");
        return;
      }
      // 新增的属性值不能与已有的属性值重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        // 需要把row从数组里面判断的时候去除
        // row是最新新增的属性值（数组的最后一项元素）
        // 判断的时候需要把已有数组当中新增的这个属性值去掉
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) return;
      // row：形参是当前用户添加的最新的属性值
      // 当前编辑模式变成查看模式【让input消失，显示span】
      row.flag = false;
    },
    // 点击span的回调，变为编辑模式
    toEdit(row, index) {
      row.flag = true;
      // $nextTick ,当节点渲染完毕了，会执行一次
      this.$nextTick(() => {
        // 获取input节点，实现自动聚焦
        // 这里不能用$refs.index是因为index是一个变量，需要用[index]
        this.$refs[index].focus();
      });
    },
    // 气泡确认框确定按钮的回调
    deleteAttrValue(index){
      this.attrInfo.attrValueList.splice(index,1);
    },
    // 保存按钮，进行添加属性或者修改属性的操作
    async addOrUpdateAttr(){
      // 整理参数：
      // 1、如果用户添加很多属性，且属性值为空的不应该提交给服务器
      // 2、并且提交给服务器的数据不应该出行flag字段
      this.attrInfo.attrValueList =  this.attrInfo.attrValueList.filter((item)=>{
          // 过滤掉属性名不为空的
          if(item.valueName != ''){
              // 删除flag字段
              delete item.flag;
              return true;
          }
      });
      // 发请求，成功干什么，失败干什么
      try {
        // 发请求
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        // 隐藏当前table栏
        this.isShowTable = true;
        // 弹出提示信息框
        this.$message({type:'success',message:'保存成功'});
        // 保存成功以后，需要再次获取平台属性进行展示
        this.getAttrList();
      } catch (error) {
        this.$message('保存失败');
      }
    }
  },
};
</script>

<style>
</style>