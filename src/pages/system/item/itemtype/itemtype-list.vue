<template>
  <div class="itemtype-list">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="种类名称">
        <el-input v-model="formData.typename" placeholder="商品种类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <router-link :to="{path:'/system/item/itemtype-add', query:{}}">
          <el-button type="success">新增</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <el-table :data="datas.itemData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="种类名称">
              <el-input v-model="formData.newtypename" placeholder="种类名称"></el-input>
            </el-form-item>
            <el-form-item label="操作">
              <el-button type="success" @click="onUpdate(props.row)">确认修改</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="种类 ID" prop="id">
      </el-table-column>
      <el-table-column label="种类名称" prop="typename">
      </el-table-column>
    </el-table>
    <pager v-if="pageInfo" :currentPage="pageInfo.page" :total="pageInfo.total" :pagesize="pageInfo.size"></pager>
  </div>
</template>
<script>
  import itemtype from '@/services/system/itemtype';
  export default {
    name: 'itemtype-list',
    data() {
      return {
        formData: {
          typename: ''
        },
        pageInfo: {
          page: 1,
          pages: 1,
          size: 10,
          total: 1
        },
        datas: {
          itemData: [{
            id: '1',
            typename: '测试商品'
          }, {
            id: '2',
            typename: '测试商品'
          }, {
            id: '3',
            typename: '测试商品'
          }]
        }
      }
    },
    methods: {
      fetchData() {
        this.$loading = true;
        const params = {
          typename: this.formData.typename,
          page: this.pageInfo.page,
          size: this.pageInfo.size
        }
        if (params.typename) {
          itemtype.findbyname(params).then(json => {
            console.log(json);
            this.$loading = false;
            this.datas.itemData = json.data;
            this.pageInfo.pages = json.pages;
            this.pageInfo.total = json.total;
            console.log('total' + this.pageInfo.total + 'pages' + this.pageInfo.pages);
          }).catch(err => {
            console.log(err);
            this.$message({
              showClose: true,
              message: '系统出错！',
              type: 'error'
            });
            this.$loading = false;
          })
        } else {
          itemtype.findall(params).then(json => {
            console.log(json);
            this.$loading = false;
            this.datas.itemData = json.data;
            this.pageInfo.pages = json.pages;
            this.pageInfo.total = json.total;
            console.log('total' + this.pageInfo.total + 'pages' + this.pageInfo.pages);
          }).catch(err => {
            console.log(err);
            this.$message({
              showClose: true,
              message: '系统出错！',
              type: 'error'
            });
            this.$loading = false;
          })
        }
      },
      onSubmit() {
        this.fetchData();
      },
      changeSize(size) {
        this.pageInfo.size = size;
        this.fetchData();
      },
      changePage(page) {
        this.pageInfo.page = page;
        this.fetchData();
      },
      onUpdate(obj) {
        obj.typename = this.formData.newtypename;
        itemtype.update(obj).then(json => {
          console.log(json);
          this.$message({
            showClose: true,
            message: '修改成功！',
            type: 'success'
          });
        }).catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: '系统出错！',
            type: 'error'
          });
          this.$loading = false;
        })
      }
    },
    created() {
      this.fetchData();
    }
  }

</script>
