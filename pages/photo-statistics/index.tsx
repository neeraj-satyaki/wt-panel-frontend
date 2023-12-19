import Head from 'next/head'
import PhotoStatisticsPage from '@/pages/photos-statistics'
export default function PhotoStatistics() {
  return (
    <>
      <Head>
        <title>Статистика по фотографиям</title>
      </Head>
      <PhotoStatisticsPage />
    </>
  )
}
