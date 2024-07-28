<template>
  <a-list
    item-layout="vertical"
    size="large"
    :pagination="pagination"
    :data-source="userList"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="`个人简介：` + item.userProfile">
          <template #avatar>
            <img width="240" height="200" alt="logo" :src="item.userAvatar" />
          </template>
          <template #title>
            <a>{{ `用户名: ` + item.userName }}</a>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
interface Props {
  userList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
});

const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 3,
};
</script>
<style scoped></style>
