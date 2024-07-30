import type { FormRule } from 'tdesign-vue-next';

export const FORM_RULES: Record<string, FormRule[]> = {
  sid: [{ required: true, message: '请选择供应商', type: 'error' }],
  sname: [{ required: true, message: '请输入供应商名称', type: 'error' }],
  cname: [{ required: true, message: '请输入联系人姓名', type: 'error' }],
  cjob: [{ required: true, message: '请输入联系人职务', type: 'error' }],
  phone: [{ required: true, message: '请输入业务电话', type: 'error' }],
  email: [{ required: true, message: '请输入电子邮箱', type: 'error' }],
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
  { label: '公司C', value: '3' } /* 客户 */,
];

export const PARTY_B_OPTIONS = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' } /* 供应商 */,
];

export const STATUS_OPTIONS = [
  { label: '已付款', value: '1' },
  { label: '已发货', value: '2' },
  { label: '已签收', value: '3' },
];
