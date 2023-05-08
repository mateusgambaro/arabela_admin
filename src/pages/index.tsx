import React, { useState } from 'react'
import Head from 'next/head'
import {
  Page,
} from '../styles/pages/Home'

const Home: React.FC = () => {
  return (
    <Page>
      <Head>
        <title></title>
      </Head>
    </Page>
  )
}
export default Home

export async function getServerSideProps() {
  return {
    props: {}
  }
}
