import axios from 'axios';
import qs from 'qs';

import type { CardListResult, ListResult } from '@/api/model/listModel';
import { request } from '@/utils/request';

const BASE_URL = 'http://127.0.0.1:5000';
const Api = {
  BaseList: '/get-list',
  CardList: '/get-card-list',
  OrderList: `${BASE_URL}/api/order/`,
  posturl: `${BASE_URL}/api/orderdetail/`,
  OrderDetail: `${BASE_URL}/api/orderdetail/`,
  Login: `${BASE_URL}/api/manager/login/`,
  In: `${BASE_URL}/api/inrecord`,
  Out: `${BASE_URL}/api/outrecord`,
  Product: `${BASE_URL}/api/product`,
  Supplier: `${BASE_URL}/api/supplier`,
  Customer: `${BASE_URL}/api/customer`,
};

export function getList() {
  /* 系统定义函数 */
  return request.get<ListResult>({
    url: Api.BaseList,
  });
}

export function getCardList() {
  /* 系统定义函数 */
  return request.get<CardListResult>({
    url: Api.CardList,
  });
}

export function getUserAccess(account: string, password: string) {
  /* 登录函数 */
  console.log(account, password);
  const response = axios({
    method: 'post',
    url: Api.Login,
    params: {
      account,
      password,
    },
  }).then((res) => {
    console.log(res.data.status);
    console.log(res);
    return res.data.status;
  });
  return response;
}

export async function getOrderList() {
  /* 获取订单函数函数 */
  const response = await axios({
    method: 'get',
    url: Api.OrderList,
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    return res.data.data;
  });
  console.log(response);
  return response;
}

export async function getOrderDetail(id: any) {
  /* 获取订单详情函数 */
  const response = await axios({
    method: 'get',
    url: Api.OrderDetail,
    params: {
      id,
    },
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    return res.data.data;
  });
  console.log(response);
  return response;
}

export function PutModify(formdata: any) {
  /* 订单修改函数 */
  console.log(formdata);
  axios({
    method: 'put',
    url: Api.posturl,
    data: qs.stringify(formdata),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}

export function DeleteRecord(id: any) {
  /* 订单删除函数 */
  console.log(id);
  axios({
    method: 'delete',
    url: Api.OrderList,
    params: {
      id,
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}

export async function Search(id: any, pid: any, cid: any, sid: any) {
  /* 订单查询函数 */
  const response = await axios({
    method: 'get',
    url: Api.OrderList,
    params: {
      id,
      pid,
      cid,
      sid,
    },
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    console.log(res.data.data);
    return res.data.data;
  });
  console.log(response);
  return response;
}

export function Create(formdata: any) {
  /* 订单新建函数 */
  console.log(formdata);
  axios({
    method: 'post',
    url: Api.OrderDetail,
    data: qs.stringify(formdata),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}

export async function getSupplierList() {
  /* 获取供应商函数函数 */
  const response = await axios({
    method: 'get',
    url: Api.Supplier,
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    return res.data.data;
  });
  console.log(response);
  return response;
}
export async function getInList() {
  /* 获取订单函数函数 */
  const response = await axios({
    method: 'get',
    url: Api.In,
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    console.log(res.data.msg);
    return res.data.data;
  });
  console.log(response);
  return response;
}
export async function getOutList() {
  /* 获取订单函数函数 */
  const response = await axios({
    method: 'get',
    url: Api.Out,
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    return res.data.data;
  });
  console.log(response);
  return response;
}
export async function getProductList() {
  /* 获取产品函数函数 */
  const response = await axios({
    method: 'get',
    url: Api.Product,
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    return res.data.data;
  });
  console.log(response);
  return response;
}

export async function getClientList() {
  /* 获取产品函数函数 */
  const response = await axios({
    method: 'get',
    url: Api.Customer,
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    return res.data.data;
  });
  console.log(response);
  return response;
}

export function SupplierDelete(id: any) {
  /* 订单删除函数 */
  console.log(id);
  axios({
    method: 'delete',
    url: Api.Supplier,
    params: {
      id,
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}
export function InDelete(id: any) {
  /* 订单删除函数 */
  console.log(id);
  axios({
    method: 'delete',
    url: Api.In,
    params: {
      id,
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}
export function OutDelete(id: any) {
  /* 订单删除函数 */
  console.log(id);
  axios({
    method: 'delete',
    url: Api.Out,
    params: {
      id,
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}
export function ProductDelete(id: any) {
  /* 订单删除函数 */
  console.log(id);
  axios({
    method: 'delete',
    url: Api.Product,
    params: {
      id,
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}

export function SupplierCreate(formdata: any) {
  /* 订单新建函数 */
  console.log(formdata);
  axios({
    method: 'post',
    url: Api.Supplier,
    data: qs.stringify(formdata),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}
export function InCreate(formdata: any) {
  /* 订单新建函数 */
  console.log(formdata);
  axios({
    method: 'post',
    url: Api.In,
    data: qs.stringify(formdata),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}
export function OutCreate(formdata: any) {
  /* 订单新建函数 */
  console.log(formdata);
  axios({
    method: 'post',
    url: Api.Out,
    data: qs.stringify(formdata),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}
export function ProductCreate(formdata: any) {
  /* 订单新建函数 */
  console.log(formdata);
  axios({
    method: 'post',
    url: Api.Product,
    data: qs.stringify(formdata),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}

export function SupplierPutModify(formdata: any) {
  /* 订单修改函数 */
  console.log(formdata);
  axios({
    method: 'put',
    url: Api.Supplier,
    data: qs.stringify(formdata),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}
export function InPutModify(formdata: any) {
  /* 订单修改函数 */
  console.log(formdata);
  axios({
    method: 'put',
    url: Api.In,
    data: qs.stringify(formdata),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}
export function OutPutModify(formdata: any) {
  /* 订单修改函数 */
  console.log(formdata);
  axios({
    method: 'put',
    url: Api.Out,
    data: qs.stringify(formdata),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}
export function ProductPutModify(formdata: any) {
  /* 订单修改函数 */
  console.log(formdata);
  axios({
    method: 'put',
    url: Api.Product,
    data: qs.stringify(formdata),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => {
    console.log(res.data.msg);
  });
}

export async function SupplierSearch(sid: any, cname: any) {
  /* 订单查询函数 */
  const response = await axios({
    method: 'get',
    url: Api.Supplier,
    params: {
      sid,
      cname,
    },
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    console.log(res.data.data);
    return res.data.data;
  });
  console.log(response);
  return response;
}
export async function InSearch(id: any, pid: any, sid: any, category: any) {
  /* 订单查询函数 */
  const response = await axios({
    method: 'get',
    url: Api.In,
    params: {
      id,
      pid,
      sid,
      category,
    },
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    console.log(res.data.data);
    return res.data.data;
  });
  console.log(response);
  return response;
}
export async function OutSearch(id: any, pid: any, sid: any, category: any) {
  /* 订单查询函数 */
  const response = await axios({
    method: 'get',
    url: Api.Out,
    params: {
      id,
      pid,
      sid,
      category,
    },
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    console.log(res.data.data);
    return res.data.data;
  });
  console.log(response);
  return response;
}
export async function ProductSearch(pid: any, sid: any, category: any) {
  /* 订单查询函数 */
  const response = await axios({
    method: 'get',
    url: Api.Product,
    params: {
      pid,
      sid,
      category,
    },
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    console.log(res.data.data);
    return res.data.data;
  });
  console.log(response);
  return response;
}

export async function getProductDetail(id: any) {
  /* 获取订单详情函数 */
  const response = await axios({
    method: 'get',
    url: Api.Product,
    params: {
      id,
    },
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    return res.data.data;
  });
  console.log(response);
  return response;
}
export async function getSupplierDetail(id: any) {
  /* 获取订单详情函数 */
  const response = await axios({
    method: 'get',
    url: Api.Supplier,
    params: {
      id,
    },
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    return res.data.data;
  });
  console.log(response);
  return response;
}
export async function getInDetail(id: any) {
  /* 获取订单详情函数 */
  const response = await axios({
    method: 'get',
    url: Api.In,
    params: {
      id,
    },
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    return res.data.data;
  });
  console.log(response);
  return response;
}
export async function getOutDetail(id: any) {
  /* 获取订单详情函数 */
  const response = await axios({
    method: 'get',
    url: Api.Out,
    params: {
      id,
    },
  }).then((res) => {
    // eslint-disable-next-line no-sequences
    return res.data.data;
  });
  console.log(response);
  return response;
}
