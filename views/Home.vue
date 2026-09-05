<script setup>
import { submitBarProps } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

// 表单数据
const formData = ref({
  city: '',
  budget: null,
  day: null
})

// 弹出框
const showCityPicker = ref(false)

// 跳转页面
const goPage = (path) => {
  router.push(path)
}

// 选择城市
const selectCity = (city) => {
  formData.value.city = city
  showCityPicker.value = false
}

const allcities = ref([
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '成都',
  '西安',
  '南京',
  '济南',
  '天津',
  '重庆',
])
const columns = allcities.value.map(city => ({
  text: city,
  value: city
}))


// 确定按钮
const onConfirm = ({ selectedOptions }) => {
  if (selectedOptions && selectedOptions[0]) {
    formData.value.city = selectedOptions[0].value
  }
  showCityPicker.value = false
}

// 取消按钮
const onCancel = () => {
  showCityPicker.value = false
}

//确定行程
const dataSubmit = () => {
  console.log(formData.value)
  if (!formData.value.city) {
    showToast('请选择城市')
    return
  }
  if (!formData.value.budget || formData.value.budget <= 100) {
    showToast('请输入大于100元的预算')
    return
  }
  if (!formData.value.day || formData.value.day <= 0 || formData.value.day > 30) {
    showToast('请输入1-30天的天数')
    return
  }
  router.push(
    {
      path: '/detail',
      query: {
        city: formData.value.city,
        budget: formData.value.budget,
        day: formData.value.day
      }
    }
  )
}

const hotCities = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '成都',
  '杭州',
  '西安',
  '南京',
]



</script>



<template>
  <div class="page-container">
    <van-nav-bar title="首页" />
    <div class="content">
      <van-notice-bar
        left-icon="volume-o"
        text="基于AI的trval项目,为用户提供智能的旅游建议。"
      />
      <div class="card">
        <div class="second-title">规划你的旅程</div>
        <van-field
          @click="showCityPicker = true"
          is-link
          label="目的地"
          v-model="formData.city"
          placeholder="请选择城市"
          readonly
          background-color="#f7f7f7"
          border-radius="8px"
          margin-bottom="12px"
        />
        <van-field
          label="预算(元)"
          v-model="formData.budget"
          placeholder="请输入预算"
          background-color="#f7f7f7"
          border-radius="8px"
          margin-bottom="12px"
        />
        <van-field
          label="天数"
          v-model="formData.day"
          placeholder="请输入天数"
          background-color="#f7f7f7"
          border-radius="8px"
          margin-bottom="12px"
        />
        <van-button @click="dataSubmit" type="primary">确定行程</van-button>
      </div>
      <div class="card">
        <div class="second-title">快捷入口</div>
        <van-grid :column-num="2" border="false">
          <van-grid-item @click="goPage('/chat')" icon="chat-o" text="AI对话" />
          <van-grid-item @click="goPage('/user')" icon="user-o" text="我的" />
        </van-grid>
      </div>
      <div class="card">
        <div class="second-title">热门目的地</div>
        <van-grid :column-num="4">
          <van-grid-item @click="selectCity(item)" v-for="item in hotCities" :key="item" >
            <div class="cityTag" :class="{'active': item === formData.city}">
              {{ item }}
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <van-popup v-model:show="showCityPicker" :style="{ padding: '64px' }" position="bottom">
      <van-picker
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>



<style scoped>
.content {
  padding: 10px;
}

.card {
  margin-bottom: 10px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
}


.second-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}

.hot-cities {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cityTag {
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 14px;
  color: #666;
  background-color: #f9fbfc;
}
.active {
  background: #1989fa;
  color: #fff;
}
</style>