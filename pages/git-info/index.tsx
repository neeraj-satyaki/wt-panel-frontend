import { GitInfoPage } from '@/pages/git-info'
import Head from 'next/head'

function GitInfo() {
  return (
    <>
      <Head>
        <title>Git info</title>
      </Head>
      <GitInfoPage />
    </>
  )
}

export default GitInfo
