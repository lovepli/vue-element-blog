//ajax请求函数模块 返回值是一个promise对象 (异步返回的数据是response.data)
import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'

Vue.prototype.$axios = axios;
export default function ajax(url,data={},type='GET') {
  // url = "http://localhost:3000"+url
  return new Promise(function (resolve,reject) {
    //执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备 url query 参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送 get 请求
      console.log(url)
      promise = axios.get(url)
    } else {
      console.log(url)
      // 发送 post 请求
      promise = axios.post(url, Qs.stringify(data))
    }
    promise.then(function (response) {
      //成功调用resolve()
      resolve(response.data);
    }).catch(function (error) {
      //失败调用reject()
      reject(error)
    })
  })
}
