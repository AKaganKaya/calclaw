import type { MenuList } from '@/interface/layout/menu.interface';

import { intercepter, mock } from '../config';

const mockMenuList: MenuList = [
  {
    code: 'main',
    label: {
      zh_CN: '引导',
      en_US: 'Ana Sayfa',
    },
    icon: 'main',
    path: '/',
  },
  {
    code: 'calculate',
    label: {
      zh_CN: '权限',
      en_US: 'Hesaplama',
    },
    icon: 'calculate',
    path: '/calculate',
    children: [
      {
        code: 'salary',
        label: {
          zh_CN: '路由权限',
          en_US: 'Maaş Hesaplama',
        },
        path: '/calculate/salary',
      },
      {
        code: 'interest',
        label: {
          zh_CN: '404',
          en_US: 'Faiz Hesaplama',
        },
        path: '/calculate/interest',
      },
      {
        code: 'rent',
        label: {
          zh_CN: '404',
          en_US: 'Kira Hesaplama',
        },
        path: '/calculate/rent',
      },
    ],
  },
  {
    code: 'documentation',
    label: {
      zh_CN: '文档',
      en_US: 'Dökümantasyon',
    },
    icon: 'documentation',
    path: '/documentation',
  },


];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
