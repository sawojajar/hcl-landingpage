import { Layout } from '@/components/layout'
import { AboutUsScreen } from '@/screen/AboutUsScreen'
import React from 'react'

const AboutUs = () => {
    return (
        <Layout navbarBackground='unset'>
            <AboutUsScreen />
        </Layout>
    )
}

export default AboutUs

export async function getServerSideProps() {
    return {
      props: {},
    };
  }