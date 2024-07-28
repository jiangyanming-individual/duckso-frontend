<template>
  <a-list item-layout="horizontal" :data-source="props.postList">
    <template #renderItem="{ item }">
      <!--      遍历tag-->
      <a-tag
        v-for="(key, index) in item.tagList"
        :key="index"
        :bordered="false"
        color="cyan"
        style="margin-top: 10px; margin-left: 16px"
        >{{ key }}</a-tag
      >
      <a-list-item>
        <a-list-item-meta :description="item.content">
          <template #title>
            <a>{{ item.title }}</a>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

//定义一个组件：用来传递数据
interface Props {
  postList: any[];
}

//接受属性：
const props = withDefaults(defineProps<Props>(), {
  postList: () => [],
});
</script>
<style scoped></style>
