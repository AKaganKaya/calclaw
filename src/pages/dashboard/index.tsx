import type { FC } from 'react';

import './index.less';

import { useEffect, useState } from 'react';


const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true);

  // mock timer to mimic dashboard data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>

    </div>
  );
};

export default DashBoardPage;
