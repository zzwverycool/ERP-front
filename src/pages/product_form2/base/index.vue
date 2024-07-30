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
        <div class="form-basic-container-title">产品信息</div>
        <!-- 表单内容 -->

        <!-- 合同名称,合同类型 -->
        <t-row class="row-gap" :gutter="[32, 24]">
          <t-col :span="6">
            <t-form-item label="产品编号" name="pid">
              <t-input v-model="formData.pid" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
            <!-- //dgsdgs -->
          </t-col>
          <t-col :span="6">
            <t-form-item label="产品名称" name="name">
              <t-input v-model="formData.name" :style="{ width: '322px' }" placeholder="请输入内容" readonly />
            </t-form-item>
            <!-- //dgsdgs -->
          </t-col>
          <t-col :span="6">
            <t-form-item label="规格型号" name="type">
              <t-input v-model="formData.type" :style="{ width: '322px' }" placeholder="请输入内容" readonly />
            </t-form-item>
            <!-- //dgsdgs -->
          </t-col>

          <t-col :span="6">
            <t-form-item label="计量单位" name="unit">
              <t-input v-model="formData.unit" :style="{ width: '322px' }" placeholder="请输入内容" />
            </t-form-item>
          </t-col>

          <t-col :span="6">
            <t-form-item label="产品类别" name="sid">
              <t-select
                v-model="formData.sid"
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

import { getProductDetail, ProductCreate } from '@/api/list';

import { CATEGORY_OPTIONS, FORM_RULES } from './constants';

const route = useRoute();
const router = useRouter();

const INITIAL_DATA = {
  pid: 0,
  name: '',
  type: '',
  unit: '',
  sid: 0,
  category: '',
};
const formData = ref({ ...INITIAL_DATA });

const fetchData = async () => {
  const { id } = route.query;
  try {
    const list = await getProductDetail(id);
    // const { list } = await getList();
    console.log(list);
    formData.value = {
      pid: list.pid,
      name: list.name,
      type: list.type,
      unit: list.unit,
      sid: list.sid,
      category: list.category,
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
  ProductCreate(putin);
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
