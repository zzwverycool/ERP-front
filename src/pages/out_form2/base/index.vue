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
        <div class="form-basic-container-title">出库信息</div>
        <!-- 表单内容 -->

        <!-- 合同名称,合同类型 -->
        <t-row class="row-gap" :gutter="[32, 24]">
          <t-col :span="6">
            <t-form-item label="出库编号" name="id">
              <t-input v-model="formData.id" :style="{ width: '322px' }" placeholder="请输入内容" readonly />
            </t-form-item>
            <!-- //dgsdgs -->
          </t-col>
          <t-col :span="6">
            <t-form-item label="业务类别" name="category">
              <t-select
                v-model="formData.category"
                :style="{ width: '322px' }"
                placeholder="请选择类型"
                class="demo-select-base"
                clearable
              >
                <t-option
                  v-for="(item, index) in CATEGORY_OPTIONS"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                >
                  {{ item.label }}
                </t-option>
              </t-select>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="产品编号" name="pid">
              <t-input v-model="formData.pid" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
            <!-- //dgsdgs -->
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
            <t-form-item label="出库时间" name="out_time">
              <t-date-picker
                v-model="formData.out_time"
                :style="{ width: '322px' }"
                theme="primary"
                mode="date"
                separator="/"
              />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="出库单价" name="price">
              <t-input v-model="formData.price" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>

          <t-col :span="6">
            <t-form-item label="出库数量" name="amount">
              <t-input v-model="formData.amount" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="出库金额" name="money">
              <t-input v-model="formData.money" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item label="经办人" name="person">
              <t-input v-model="formData.person" :style="{ width: '322px' }" placeholder="请输入内容" />
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

import { getOutDetail, OutCreate } from '@/api/list';

import { CATEGORY_OPTIONS, FORM_RULES, PARTY_B_OPTIONS } from './constants';

const route = useRoute();
const router = useRouter();

const INITIAL_DATA = {
  id: '',
  category: '',
  pid: '',
  sid: '',
  out_time: '',
  price: '',
  amount: '',
  money: '',
  person: '',
};
const formData = ref({ ...INITIAL_DATA });

const fetchData = async () => {
  const { id } = route.query;
  try {
    const list = await getOutDetail(id);
    // const { list } = await getList();
    console.log(list);
    formData.value = {
      id: list.id,
      category: list.category,
      pid: list.pid,
      sid: list.sid,
      out_time: list.out_time,
      price: list.price,
      amount: list.amount,
      money: list.money,
      person: list.person,
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
  OutCreate(putin);
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
