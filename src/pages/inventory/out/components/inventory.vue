<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="list-common-table">
    <t-form ref="form" :data="formData" :label-width="80" colon @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[24, 24]">
            <t-col :span="4">
              <t-form-item label="出库订单" name="id">
                <t-input
                  v-model="formData.id"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入出库编号"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="产品编号" name="pid">
                <t-input
                  v-model="formData.pid"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入产品编号"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="业务类别" name="category">
                <t-select
                  v-model="formData.category"
                  style="display: inline-block"
                  class="form-item-content"
                  :options="CATEGORY_OPTIONS"
                  placeholder="请选择业务类别"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="供应商编号" name="sid">
                <t-select
                  v-model="formData.sid"
                  style="display: inline-block"
                  class="form-item-content"
                  :options="PARTY_B_OPTIONS"
                  placeholder="请选择供应商编号"
                />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <t-button theme="primary" type="submit" :style="{ marginLeft: 'var(--td-comp-margin-s)' }" @click="OnSearch"> 查询 </t-button>
          <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
          <t-button theme="primary" type="submit" :style="{ marginLeft: 'var(--td-comp-margin-s)' }" @click="OnCreate()"> 新建 </t-button>
        </t-col>
      </t-row>
    </t-form>

    <div class="table-container">
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="pagination"
        :loading="dataLoading"
        :header-affixed-top="headerAffixedTop"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
      >
        <template #status="{ row }">
          <t-tag v-if="row.status === CONTRACT_STATUS.FAIL" theme="danger" variant="light"> 审核失败 </t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.AUDIT_PENDING" theme="warning" variant="light"> 待审核 </t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.EXEC_PENDING" theme="warning" variant="light"> 待履行 </t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.EXECUTING" theme="success" variant="light"> 履行中 </t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.FINISH" theme="success" variant="light"> 已完成 </t-tag>
        </template>
        <template #contractType="{ row }">
          <p v-if="row.contractType === CONTRACT_TYPES.MAIN">审核失败</p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUB">待审核</p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUPPLEMENT">待履行</p>
        </template>
        <template #paymentType="{ row }">
          <p v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.PAYMENT" class="payment-col">
            付款<trend class="dashboard-item-trend" type="up" />
          </p>
          <p v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.RECEIPT" class="payment-col">
            收款<trend class="dashboard-item-trend" type="down" />
          </p>
        </template>
        <template #op="slotProps">
          <a class="t-button-link" @click="rehandleClickOp(slotProps)">管理</a>
          <a class="t-button-link" @click="modify(slotProps)">修改</a>
          <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
        </template>
      </t-table>
      <t-dialog
        v-model:visible ="confirmVisible"
        header="确认删除当前所选合同？"
        :body="confirmBody"
        :on-cancel="onCancel"
        @confirm="onConfirmDelete"
      />

      <t-dialog v-model:visible="visible" header="基本信息" @confirm="onConfirm">
      <template #body>
        <div class="dialog-info-block">
          <div class="dialog-info-block">
            <div v-for="(item, index) in BASE_INFO_DATA" :key="index" class="info-item">
              <h1>{{ item.name }}</h1>
              <span
                :class="{
                  ['green']: item.type && item.type.value === 'green',
                  ['blue']: item.type && item.type.value === 'blue',
                }"
                >{{ item.value }}</span
              >
            </div>
          </div>
        </div>
      </template>
    </t-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MessagePlugin, PageInfo, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getList, getOutDetail, getOutList, OutDelete, OutSearch } from '@/api/list';
import Trend from '@/components/trend/index.vue';
import { prefix } from '@/config/global';
import { CONTRACT_PAYMENT_TYPES, CONTRACT_STATUS, CONTRACT_TYPE_OPTIONS, CONTRACT_TYPES } from '@/constants';
import { CATEGORY_OPTIONS, PARTY_B_OPTIONS } from '@/pages/out_form/base/constants';
import { useSettingStore } from '@/store';

const BASE_INFO_DATA = ref([
  {
    name: '出库编号',
    value: 1,
    type: null,
  },
  {
    name: '业务类别',
    value: 2,
    type: null,
  },
  {
    name: '产品编号',
    value: 1,
    type: null,
  },
  {
    name: '供应商编号',
    value: 1,
    type: null,
  },
  {
    name: '出库时间',
    value: '2020-12-04',
    type: null,
  },
  {
    name: '出库单价',
    value: '10000',
    type: null,
  },
  {
    name: '出库数量',
    value: '100',
    type: null,
  },
  {
    name: '出库金额',
    value: '100000',
    type: null,
  },
  {
    name: '经办人',
    value: 'zzw',
    type: null,
  },
]);

const store = useSettingStore();
const router = useRouter();

const COLUMNS: PrimaryTableCol[] = [
  {
    title: '出库编号',
    fixed: 'left',
    width: 280,
    ellipsis: true,
    align: 'left',
    colKey: 'id',
  },
  { title: '业务类别', colKey: 'category', width: 160 },
  {
    title: '产品编号',
    width: 160,
    ellipsis: true,
    colKey: 'pid',
  },
  {
    title: '供应商编号',
    width: 160,
    ellipsis: true,
    colKey: 'sid',
  },
  {
    title: '出库单价',
    width: 160,
    ellipsis: true,
    colKey: 'price',
  },
  {
    title: '出库数量',
    width: 160,
    ellipsis: true,
    colKey: 'amount',
  },
  {
    title: '出库金额',
    width: 160,
    ellipsis: true,
    colKey: 'money',
  },
  {
    title: '出库时间',
    width: 160,
    ellipsis: true,
    colKey: 'out_time',
  },
  {
    title: '经办人',
    width: 160,
    ellipsis: true,
    colKey: 'person',
  },
];

const searchForm = {
  id: '',
  pid: '',
  sid: typeof PARTY_B_OPTIONS,
  category: typeof CATEGORY_OPTIONS,
};

const formData = ref({ ...searchForm });
const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const pagination = ref({
  defaultPageSize: 20,
  total: 100,
  defaultCurrent: 1,
});
const confirmVisible = ref(false);
const visible = ref(false);

const data = ref([]);

const dataLoading = ref(false);
const fetchData = async () => {
  dataLoading.value = true;
  try {
    const list = await getOutList();
    // const { list } = await getList();
    console.log(list);
    data.value = list;
    console.log(data.value[0]);
    pagination.value = {
      ...pagination.value,
      total: list.length,
    };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    const name = data.value[deleteIdx.value - 1];
    console.log(name);
    return `删除后，${name.id}的所有信息将被清空，且无法恢复`;
  }
  return '';
});

const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = () => {
  // 真实业务请发起请求
  data.value.splice(deleteIdx, 1);
  console.log(deleteIdx);
  pagination.value.total = data.value.length;
  confirmVisible.value = false;
  console.log(deleteIdx.value);
  OutDelete(deleteIdx.value);
  MessagePlugin.success('删除成功');
  resetIdx();
};

const onConfirm = () => {
  visible.value = false;
};

const modify = (ctx: unknown) => {
  console.log(ctx.row.id);
  router.push({
    path: '/out_form/base',
    query: {
      id: ctx.row.id,
    },
  });
};

const OnCreate = () => {
  router.push({
    path: '/out_form/base',
  });
};

const onCancel = () => {
  resetIdx();
};

onMounted(() => {
  fetchData();
});

const OnSearch = async () => {
  dataLoading.value = true;
  try {
    const result = formData.value;
    console.log(result.id);
    const list = await OutSearch(result.id, result.pid, result.sid, result.category);
    // const { list } = await getList();
    console.log(list);
    data.value = list;
    console.log(data);
    pagination.value = {
      ...pagination.value,
      total: list.length,
    };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

const handleClickDelete = (slot: {
  row: {
    id: number;
    rowIndex: number;
  };
}) => {
  deleteIdx.value = slot.row.id;
  console.log(deleteIdx.value);
  confirmVisible.value = true;
};
const onReset = (val: unknown) => {
  console.log(val);
};
const onSubmit = (val: unknown) => {
  console.log(val);
};
const rehandlePageChange = (pageInfo: PageInfo, newDataSource: TableRowData[]) => {
  console.log('分页变化', pageInfo, newDataSource);
};
const rehandleChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log('统一Change', changeParams, triggerAndData);
};
const rehandleClickOp = async (ctx: unknown) => {
  console.log(BASE_INFO_DATA.value);
  console.log(ctx.row.id);
  // eslint-disable-next-line camelcase
  const row_id = ctx.row.id;
  const list = await getOutDetail(row_id);
  // const { list } = await getList();
  console.log(list);
  console.log(list.id);
  pagination.value = {
    ...pagination.value,
    total: list.length,
  };
  BASE_INFO_DATA.value = [
    {
      name: '出库编号',
      value: list.id,
      type: null,
    },
    {
      name: '业务类别',
      value: list.category,
      type: null,
    },
    {
      name: '产品编号',
      value: list.pid,
      type: null,
    },
    {
      name: '供应商编号',
      value: list.sid,
      type: null,
    },
    {
      name: '出库时间',
      value: list.out_time,
      type: null,
    },
    {
      name: '出库单价',
      value: list.price,
      type: null,
    },
    {
      name: '出库数量',
      value: list.amount,
      type: null,
    },
    {
      name: '出库金额',
      value: list.money,
      type: null,
    },
    {
      name: '经办人',
      value: list.person,
      type: null,
    },
  ];
  visible.value = true;
  console.log(BASE_INFO_DATA.value);
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: store.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);
</script>

<style lang="less" scoped>
.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  border-radius: var(--td-radius-medium);

  .table-container {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.form-item-content {
  width: 100%;
}

.operation-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .expand {
    .t-button__text {
      display: flex;
      align-items: center;
    }
  }
}

.payment-col {
  display: flex;

  .trend-container {
    display: flex;
    align-items: center;
    margin-left: var(--td-comp-margin-s);
  }
}
</style>
