import type { FormRule } from 'tdesign-vue-next';

export const FORM_RULES: Record<string, FormRule[]> = {
  id: [{ required: true, message: '请输入订单编号', type: 'error' }],
  category: [{ required: true, message: '请输入顾客编号', type: 'error' }],
  pid: [{ required: true, message: '请选择产品类型', type: 'error' }],
  sid: [{ required: true, message: '请选择供应商', type: 'error' }],
  out_time: [{ required: true, message: '请选择日期', type: 'error' }],
  price: [{ required: true, message: '请输入销售单价', type: 'error' }],
  amount: [{ required: true, message: '请输入订购数量', type: 'error' }],
  money: [{ required: true, message: '请输入订单金额', type: 'error' }],
  person: [{ required: true, message: '请输入发货人', type: 'error' }],
};

export const TYPE_OPTIONS = [
  { label: '数码', value: '1' },
  { label: '家居', value: '2' },
  { label: '服装', value: '3' },
  { label: '食品', value: '4' },
  { label: '其他', value: '5' },
];

export const PARTY_A_OPTIONS = [
  { label: '公司A', value: '1' },
  { label: '公司B', value: '2' },
  { label: '公司C', value: '3' },/* 客户 */
];

export const PARTY_B_OPTIONS = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },/* 供应商 */
];

export const STATUS_OPTIONS = [
  { label: '已付款', value: '1' },
  { label: '已发货', value: '2' },
  { label: '已签收', value: '3' },
];

export const CATEGORY_OPTIONS = [
  { label: '采购', value: '1' },
  { label: '销售', value: '2' },
  { label: '入库', value: '3' },
  { label: '出库', value: '4' },
];
