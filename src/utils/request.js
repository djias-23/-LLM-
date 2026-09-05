import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  baseURL: 'https://159.75.169.224:1236',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default request

//处理流式接口
export async function fetchStream(url, data, onChunck, onComplete, onError) {
//终止的请求控制器
  const controller = new AbortController()
  

const response= await fetch(`http://159.75.169.224:1236/api/travel/${url}`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    signal: controller.signal
  })

  //创建响应体的可读流读取器
  const reader = response.body.getReader()
  //将二进制流解读为可读字符串
  const decoder = new TextDecoder()


  while(true){
    const {done,value} = await reader.read()
    if(done){
      
      break
    }
    const chunk = decoder.decode(value, {stream: true})
    console.log(chunk)
}
  return controller.abort()
}
