/*
 * @Description: 接口转换函数，可自定义
 * @Type: function 
 * @Author: Ben
 * @LastEditors: Ben
 * @Date: 2019-04-18 12:13:21
 * @LastEditTime: 2019-05-05 15:36:05
 */

import axios from 'axios';
import apiConfig from './api_config';
import {Eapis} from './api_config';
//import kernalFetch from 'kernal-fetch';

// TODO:设置 baseURL
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
// TODO:设置 default header
// TODO:设置钩子函数

// EDIT: 设置默认请求处理器
const defaultKernal = axios;

/**
 *
 * @param {string} name (api name)
 * @param {object} data (api 参数)
 */
 export default async function chili(name:number, data?:object) {
   if (!Object.prototype.hasOwnProperty.call(apiConfig, name)) {
     throw new RangeError(`apiConfig hasn't the api config of ${name} .`);
   }

   const config = apiConfig[name as Eapis];
   // 外部是否有参数，通过配置里面需要描述参数结构
   const param = data
     ? Object.assign({}, config.option, { data })
     : config.option;
   try {
     const fullRes = config['kernel']
       ? await config['kernel'](param)
       : await defaultKernal(param);
     // 是否需要 middle 转换数据 // 约定插件
     if (config['middle']) {
       fullRes.data = config['middle'](fullRes.data);
     }
     // 是否只获取精简数据(抛弃 code , msg 信息) // 约定插件
     if (config.sim) {
       const simRes = Array.isArray(fullRes)
         ? fullRes.map(item => {
             return item.data;
           })
         : fullRes.data;
       return simRes;
     }
     return fullRes;
   } catch (err) {
     throw err;
   }
 }
