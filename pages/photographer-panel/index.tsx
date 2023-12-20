import Head from 'next/head'
import PhotoStatisticsPage from '@/pages/photos-statistics'
export default function PhotoStatistics() {
  return (
    <>
      <Head>
        <title>Панель фотографа</title>
      </Head>
      <PhotoStatisticsPage />
    </>
  )
}
