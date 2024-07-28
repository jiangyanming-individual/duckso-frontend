<template>
  <div class="indexPage">
    <div>
      <a-input-search
        v-model:value="searchParams.text"
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

const router = useRouter();
const route = useRoute();

/**
 * 初始化搜索参数
 */
const initSearchParams = {
  //搜索的参数
  text: "",
  current: 1, //分页
  pageSize: 10,
};

//路由信息
const activeKey = route.params.category;

//ref 引用数据类型
const searchParams = ref(initSearchParams);

//数据列表信息：
const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]);

/**
 * 监听搜索的参数是否变化：
 */
watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text, //从请求路径中拿数据
  } as any;
});

/**
 * 进行数据的加载：
 * @param params
 */
const loadData = (params: any) => {
  //查询参数：
  const query = {
    ...params,
    searchText: params.text,
  };
  // myAxios.post("/post/list/page/vo", postQuery).then((res: any) => {
  //   postList.value = res.records;
  // });
  //
  // const userQuery = {
  //   ...params,
  //   userName: params.text,
  // };
  // myAxios.post("/user/list/page/vo", userQuery).then((res: any) => {
  //   userList.value = res.records;
  // });
  //
  // const pictureQuery = {
  //   ...params,
  //   searchText: params.text,
  // };
  // myAxios.post("/picture/list/page/vo", pictureQuery).then((res: any) => {
  //   pictureList.value = res.records;
  // });

  //聚合搜索,后端聚合的接口：
  myAxios.post("/search/all", query).then((res: any) => {
    postList.value = res.postVOList;
    userList.value = res.userVOList;
    pictureList.value = res.pictureVOList;
  });
};

//首次加载，仅加载一次：
onMounted(() => {
  //传入初始化参数：
  loadData(initSearchParams);
});

/**
 * 搜索，绑定路由：
 * @param value
 */
const onSearch = (value: string) => {
  router.push({
    query: searchParams.value,
  });
  //根据条件查询数据：
  loadData(searchParams.value);
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
