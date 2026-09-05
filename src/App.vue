<template>
  <router-view />
  <van-tabbar v-if="['home', 'chat', 'user'].includes(route.name)" route >
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/chat" icon="chat-o">对话</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">用户</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const count = ref(0)
</script>
