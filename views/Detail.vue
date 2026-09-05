<script setup>
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getTravelRecommend } from '../api/travel'
import { ref } from 'vue'
import { Toast } from 'vant'

const route = useRoute()
const loading = ref(false)
const error = ref(false)
const tripData = ref(null)

const formData = reactive({
  city: '',
  budget: null,
  day: null
})

onMounted(() => {
  console.log(route.query)
  formData.city = route.query.city
  formData.budget = Number(route.query.budget)
  formData.day = Number(route.query.day)
  fetchRecommend()
})

const fetchRecommend = async () => {
  loading.value = true
  try {
    const res = await getTravelRecommend({
      city: formData.city,
      budget: formData.budget,
      days: formData.day
    })
    tripData.value = res
    console.log('推荐数据:', res)
  } catch (err) {
    console.error('接口请求失败:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}


</script>

<template>
  <div class="container">
    <van-nav-bar title="推荐结果" />
    <div class="content">
      <template v-if="loading">
        <van-loading size="48px" type="spinner" />
      </template>
      <template v-else-if="error">
        <van-empty description="接口请求失败，请稍后重试">
          <van-button type="primary" @click="fetchRecommend">重新获取</van-button>
        </van-empty>
      </template>
      <template v-else-if="tripData && tripData.success">
        <div class="overreview-card">
          <div class="tripHeader">
            <h2>{{ tripData.data.city }} {{ tripData.data.days }}天</h2>
            <div class="tripInfo">
              {{ tripData.data.budget }}元预算
            </div>
          </div>
        </div>
        <van-collapse v-model="activeNames">
          <van-collapse-item title="标题1" name="1" v-for="day in tripData.data.dailyItinerary" :key="day.days"
            <div calss="shedule">
            <div>
            </div>
          </van-collapse-item>
        </van-collapse>
        <div calss="budget-card">
          <div class="section-title">预算明细</div>
        </div>
        <div calss="budget-card">
          <div class="section-title">温馨提示</div>
        </div>
        <div calss="budget-card">
          <div class="section-title">注意事项</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.tripHeader {
  display: flex;
}
</style>