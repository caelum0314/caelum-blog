<template>
  <div>
    <!-- 随机友链按钮 -->
    <div class="flex justify-end mb-6">

      <button
        class=" btn-regular scale-animation rounded-lg h-[2.90rem] px-4 sm:px-5 font-bold active:scale-95 gap-2"
        @click="randomJump"
      >
      <Icon
        icon="fa6-solid:arrow-right-arrow-left"
        class="transition "
      >
      </Icon>
        <span class="hidden sm:inline">随机一个友链</span>
      </button>
    </div>

    <!-- 原有的友链网格 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 my-4">
      <LinkCard
        v-for="link in randomLinks"
        :key="link.link"
        :title="link.title"
        :desc="link.desc"
        :link="link.link"
        :img="link.img"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import LinkCard from "./LinkCard.vue";
import { Icon } from "@iconify/vue";

const links: { title: string; link: string; desc: string; img: string }[] = [];

const randomLinks = computed(() => links.sort(() => Math.random() - 0.5));

// 随机跳转方法
const randomJump = () => {
  const index = Math.floor(Math.random() * links.length);
  const url = links[index]?.link;
  if (url) {
    window.open(url, "_blank");
}
};
</script>
