<template>
  <div class="indexPage">
    <div>
      <a-input-search
        v-model:value="searchText"
        placeholder="请输入搜索内容"
        enter-button="搜索"
        size="large"
        @search="onSearch"
      />
    </div>
    <my-divider />
    <div class="tab">
      <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
        <a-tab-pane key="post" tab="文章">
          <PostList :post-list="postList" />
        </a-tab-pane>
        <a-tab-pane key="picture" tab="图片" force-render>
          <PictureList :picture-list="pictureList" />
        </a-tab-pane>
        <a-tab-pane key="user" tab="用户">
          <UserList :user-list="userList" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import PostList from "@/components/PostList.vue";
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";
import MyDivider from "@/components/MyDivider.vue";
import myAxios from "@/plugins/myAxios";
import { message } from "ant-design-vue";

const router = useRouter();
const route = useRoute();

//路由信息
const activeKey = route.params.category;

//搜索参数
const searchText = ref(route.query.text || "");

/**
 * 初始化搜索参数
 */
const initSearchParams = {
  // 搜索的类型
  type: activeKey,
  //搜索的内容
  text: "",
  current: 1, //分页
  pageSize: 10,
};

//ref 引用数据类型
const searchParams = ref(initSearchParams);

//数据列表信息：
const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]);

// /**
//  * 进行数据的加载：
//  * @param params
//  */
// const loadDataOld = (params: any) => {
//   //查询参数：
//   const postQuery = {
//     ...params,
//     searchText: params.text,
//   };
//   myAxios.post("/post/list/page/vo", postQuery).then((res: any) => {
//     postList.value = res.records;
//   });
//
//   const userQuery = {
//     ...params,
//     userName: params.text,
//   };
//   myAxios.post("/user/list/page/vo", userQuery).then((res: any) => {
//     userList.value = res.records;
//   });
//
//   const pictureQuery = {
//     ...params,
//     searchText: params.text,
//   };
//   myAxios.post("/picture/list/page/vo", pictureQuery).then((res: any) => {
//     pictureList.value = res.records;
//   });
// };
//
// /**
//  * 发送所有请求一次性发送所有的请求：
//  * @param params
//  */
// const loadAllData = (params: any) => {
//   //查询参数：
//   const query = {
//     ...params,
//     searchText: params.text,
//   };
//   //聚合搜索,后端聚合的接口：
//   myAxios.post("/search/all", query).then((res: any) => {
//     postList.value = res.postVOList;
//     userList.value = res.userVOList;
//     pictureList.value = res.pictureVOList;
//   });
// };

/**
 * 加载单类的数据：
 * @param params
 */
const loadData = (params: any) => {
  const { type } = params;

  if (!type) {
    message.error("请求类型为空");
    return;
  }
  //查询参数：
  const query = {
    ...params,
    // text 赋值给searchText 后端的字段
    searchText: params.text,
  };
  //聚合搜索,后端聚合的接口：
  myAxios.post("/search/all", query).then((res: any) => {
    if (type === "post") {
      postList.value = res.dataList;
    } else if (type === "user") {
      userList.value = res.dataList;
    } else if (type === "picture") {
      pictureList.value = res.dataList;
    }
  });
};

/**
 * 监听搜索的参数是否变化：
 */
watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text, //从请求路径中拿请求内容
    type: route.params.category, //请求类型；
  } as any;
  //触发单次加载：
  loadData(searchParams.value);
});

/**
 * 搜索，绑定路由：
 * @param value
 */
const onSearch = (value: string) => {
  router.push({
    query: {
      ...searchParams.value,
      text: value,
    },
  });
  //获取到搜索的内容 value
  // alert(value);
};

/**
 * 改变tab后，也改变搜索的条件：
 * @param key
 */
const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`, //  /路由/?params
    query: searchParams.value,
  });
};
</script>
