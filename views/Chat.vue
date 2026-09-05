<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchStream } from '../utils/request'



const router = useRouter()
const chatHistory = ref(false) 

const goBack = () => {
  router.back()
}

//输入框
const inputMessage = ref('')
const loading = ref(false)
const message = ref([])
//发送消息
const sendMessage = () => {
   fetchStream('/chat', {message: inputMessage.value}, (chunk) => {
    console.log(chunk)
   })
   inputMessage.value = ''
   loading.value = false
}



</script>
<template>
  <div class="container">
  <div class="page-header">
    <van-nav-bar 
    title="AI助手"
    left-arrow
    left-text="返回"
    @click-left-icon="goBack"
    fixed
    />
  </div>
  <div class="chat-content">
    <!-- //没有对话内容 -->
    <div class="empty" v-if="message.length === 0">
      <van-empty description="暂无对话记录" />
    </div>
    <!-- //输入框始终显示 -->
    <div class="input-container">
      <van-field
        v-model="inputMessage"
        placeholder="请输入对话内容"
        :disabled="loading"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sendMessage">发送</van-button>
        </template>
      </van-field>
    </div>
  </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 46px;
}

.input-container {
  padding: 10px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}
</style>