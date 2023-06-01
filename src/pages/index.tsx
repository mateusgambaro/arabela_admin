import React, { useState } from 'react'
import Head from 'next/head'
import { Page } from '../styles/pages/Home'
import Login from '../components/Login/Login'
import Image from 'next/image'
import arabela_logo from '../../public/arabela_logo.jpg'

const Home: React.FC = () => {
  return (
    <Page>
      <Head>
        <title>Arabela Admin</title>
      </Head>
      <Image src={arabela_logo} alt="arabela-logo" width={250} height={250} />
      <Login />
    </Page>
  )
}
export default Home

export async function getServerSideProps() {
  return {
    props: {}
  }
}
