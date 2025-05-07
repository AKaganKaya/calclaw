import type { FC } from 'react';
import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import LayoutPage from '@/pages/layout';
import LoginPage from '@/pages/login';

import WrapperRouteComponent from './config';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
const Documentation = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/doucumentation'));
const Guide = lazy(() => import(/* webpackChunkName: "guide'"*/ '@/pages/guide'));

const SalaryCalculatorPage = lazy(() => import('@/pages/calculate/SalaryCalculator'));
const InterestCalculatorPage = lazy(() => import('@/pages/calculate/InterestCalculator'));
const RentCalculatorPage = lazy(() => import('@/pages/calculate/RentCalculator'));
const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [

      {
        path: 'calculate/salary',
        element: <WrapperRouteComponent element={<SalaryCalculatorPage />} titleId="title.calculate.salary" />,
      },
      {
        path: 'calculate/interest',
        element: <WrapperRouteComponent element={<InterestCalculatorPage />} titleId="title.calculate.interest" />,
      },
      {
        path: 'calculate/rent',
        element: <WrapperRouteComponent element={<RentCalculatorPage />} titleId="title.calculate.rent" />,
      },
      {
        path: '',
        element: <Navigate to="/guide" replace />,
      },
      {
        path: 'documentation',
        element: <WrapperRouteComponent element={<Documentation />} titleId="title.documentation" />,
      },
      {
        path: 'guide',
        element: <WrapperRouteComponent element={<Guide />} titleId="title.guide" />,
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
