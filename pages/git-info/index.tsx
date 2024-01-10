import Head from 'next/head'

function GitInfo() {
  return (
    <>
      <Head>
        <title>Git info</title>
      </Head>
      <div className="p-4">{process.env.GIT_INFO}</div>
    </>
  )
}

export default GitInfo
