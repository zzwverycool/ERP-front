import { defineStore } from 'pinia';

import type { NotificationItem } from '@/types/interface';

const msgData = [
  {
    id: '123',
    content: 'ERP工程，正式动工了！',
    type: '工程动态',
    status: true,
    collected: false,
    date: '2023-07-01 15:00',
    quality: 'high',
  },
  {
    id: '124',
    content: '完成了第一个订单页面！',
    type: '项目动态',
    status: true,
    collected: false,
    date: '2023-07-04 08:00',
    quality: 'low',
  },
  {
    id: '125',
    content: '2023-07-05 13:30的【软件工程】小组会议即将开始，请提前10分钟前往教室！',
    type: '会议通知',
    status: true,
    collected: false,
    date: '2023-07-05 08:00',
    quality: 'middle',
  },
  {
    id: '126',
    content: 'ERP 通过验收！',
    type: '项目动态',
    status: true,
    collected: false,
    date: '2023-07-06 18:00',
    quality: 'low',
  },
];

type MsgDataType = typeof msgData;

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    msgData,
  }),
  getters: {
    unreadMsg: (state) => state.msgData.filter((item: NotificationItem) => item.status),
    readMsg: (state) => state.msgData.filter((item: NotificationItem) => !item.status),
  },
  actions: {
    setMsgData(data: MsgDataType) {
      this.msgData = data;
    },
  },
  persist: true,
});
