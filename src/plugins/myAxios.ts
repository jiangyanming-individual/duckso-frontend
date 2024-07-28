import axios from "axios";

//添加cookie
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "http://localhost:8120/api",
  timeout: 10000, //设置超时时间为10s;
  headers: {},
});

instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log("请求数据");
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    const res = response.data;
    console.log("响应的数据为:" + res);
    //数据请求成功：返回给data数据：
    if (res.code === 0) {
      return res.data;
    }
    //返回错误信息
    console.error("request error: " + res);
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
