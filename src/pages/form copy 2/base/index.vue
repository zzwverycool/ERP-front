<template>
  <t-form
    ref="form"
    class="base-form"
    :data="formData"
    :rules="FORM_RULES"
    label-align="top"
    :label-width="100"
    @reset="onReset"
    @submit="onSubmit"
  >
    <div class="form-basic-container">
      <div class="form-basic-item">
        <div class="form-basic-container-title">订单信息</div>
        <!-- 表单内容 -->

        <!-- 合同名称,合同类型 -->
        <t-row class="row-gap" :gutter="[32, 24]">
          <t-col :span="6">
            <t-form-item label="订单编号" name="id">
              <t-input v-model="formData.id" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
            <!-- //dgsdgs -->
          </t-col>
          <t-col :span="6">
            <t-form-item label="产品编号" name="pid">
              <t-input v-model="formData.pid" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
            <!-- //dgsdgs -->
          </t-col>

          <!-- 合同收付类型 -->
          <t-col :span="8">
            <t-form-item label="付款方式" name="method">
              <t-radio-group v-model="formData.method">
                <t-radio value="1"> 支付宝 </t-radio>
                <t-radio value="2"> 微信 </t-radio>
                <t-radio value="3"> 银行卡 </t-radio>
                <t-radio value="4"> 现金 </t-radio>
              </t-radio-group>
              <span class="space-item" />
            </t-form-item>
          </t-col>

          <t-col :span="6">
            <t-form-item label="客户编号" name="cid">
              <t-input v-model="formData.cid" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>

          <t-col :span="6">
            <t-form-item label="供应商编号" name="sid">
              <t-select
                v-model="formData.sid"
                :style="{ width: '322px' }"
                placeholder="请选择类型"
                class="demo-select-base"
                clearable
              >
                <t-option v-for="(item, index) in PARTY_B_OPTIONS" :key="index" :value="item.value" :label="item.label">
                  {{ item.label }}
                </t-option>
              </t-select>
            </t-form-item>
          </t-col>

          <t-col :span="6">
            <t-form-item label="预定时间" name="book_time">
              <t-date-picker
                v-model="formData.book_time"
                :style="{ width: '322px' }"
                theme="primary"
                mode="date"
                separator="/"
              />
            </t-form-item>
          </t-col>

          <t-col :span="6">
            <t-form-item label="发货时间" name="order_time">
              <t-date-picker
                v-model="formData.order_time"
                :style="{ width: '322px' }"
                theme="primary"
                mode="date"
                separator="/"
              />
            </t-form-item>
          </t-col>

          <t-col :span="6">
            <t-form-item label="付款时间" name="pay_time">
              <t-date-picker
                v-model="formData.pay_time"
                :style="{ width: '322px' }"
                theme="primary"
                mode="date"
                separator="/"
              />
            </t-form-item>
          </t-col>

          <t-col :span="6">
            <t-form-item label="销售单价" name="price">
              <t-input v-model="formData.price" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="订购数量" name="amount">
              <t-input v-model="formData.amount" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="订单金额" name="money">
              <t-input v-model="formData.money" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="发货地址" name="address">
              <t-input v-model="formData.address" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="发货人" name="person">
              <t-input v-model="formData.person" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="状态" name="state">
              <t-select
                v-model="formData.state"
                :style="{ width: '322px' }"
                placeholder="请选择类型"
                class="demo-select-base"
                clearable
              >
                <t-option v-for="(item, index) in STATUS_OPTIONS" :key="index" :value="item.value" :label="item.label">
                  {{ item.label }}
                </t-option>
              </t-select>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="备注" name="remark">
              <t-input v-model="formData.remark" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
        </t-row>
      </div>
    </div>

    <div class="form-submit-container">
      <div class="form-submit-sub">
        <div class="form-submit-left">
          <t-button theme="primary" class="form-submit-confirm" type="submit" @click="OnCreate"> 确认提交 </t-button>
          <t-button type="reset" class="form-submit-cancel" theme="default" variant="base" @click="OnCancel">
            取消
          </t-button>
        </div>
      </div>
    </div>
  </t-form>
</template>

<script lang="ts">
export default {
  name: 'FormBase',
};
</script>

<script setup lang="ts">
import type { SubmitContext } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Create, getOrderDetail } from '@/api/list';

import { FORM_RULES, PARTY_B_OPTIONS, STATUS_OPTIONS } from './constants';

const route = useRoute();
const router = useRouter();

const INITIAL_DATA = {
  id: '',
  cid: '',
  pid: '',
  sid: '',
  book_time: '',
  order_time: '',
  price: '',
  amount: '',
  money: '',
  method: '1',
  pay_time: '',
  address: '',
  person: '',
  state: '',
  remark: '',
};
const formData = ref({ ...INITIAL_DATA });

const fetchData = async () => {
  const { id } = route.query;
  try {
    const list = await getOrderDetail(id);
    // const { list } = await getList();
    console.log(list);
    formData.value = {
      id: list.id,
      cid: list.cid,
      pid: list.pid,
      sid: list.sid,
      book_time: list.book_time,
      order_time: list.order_time,
      price: list.price,
      amount: list.amount,
      money: list.money,
      method: String(list.method),
      pay_time: list.pay_time,
      address: list.address,
      person: list.person,
      state: list.state,
      remark: list.remark,
    };
  } catch (e) {
    console.log(e);
  }
};

const onReset = () => {
  MessagePlugin.warning('取消修改');
};
const onSubmit = (ctx: SubmitContext) => {
  if (ctx.validateResult === true) {
    MessagePlugin.success('修改成功');
  }
};

const OnCreate = () => {
  const putin = formData.value;
  console.log(putin);
  Create(putin);
  router.go(-1);
};

const OnCancel = () => {
  router.go(-1);
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
