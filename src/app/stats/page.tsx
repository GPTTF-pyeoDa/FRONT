'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatisticsPage() {
  // 이 데이터는 실제 사용자 데이터로 대체되어야 합니다
  const postCount = 15;
  // const wordData = {
  //   labels: ['사랑', '행복', '꿈', '희망', '자유'],
  //   datasets: [
  //     {
  //       label: '단어 사용 빈도',
  //       data: [12, 19, 3, 5, 2],
  //       backgroundColor: 'rgba(75, 192, 192, 0.6)',
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top' as const,
  //     },
  //     title: {
  //       display: true,
  //       text: '자주 사용한 단어',
  //     },
  //   },
  // };

  return (
    <div className='min-h-screen bg-blue-50 p-8 text-blue-900'>
      <h1 className='text-3xl font-semibold text-blue-800 mb-8'>
        내 글쓰기 통계
      </h1>
      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl font-medium text-blue-700 mb-4'>
          총 작성 글 수
        </h2>
        <p className='text-4xl font-bold text-blue-900'>{postCount}</p>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl font-medium text-blue-700 mb-4'>
          자주 사용한 단어
        </h2>
        <div>차트영역</div>
      </div>
    </div>
  );
}
