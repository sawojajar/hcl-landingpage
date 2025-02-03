import { Layout } from '@/components/layout'
import { ProductDetailScreen } from '@/screen/ProductDetailScreen'
import React from 'react'

const ProductDetail = () => {
  return (
    <Layout navbarBackground='unset'>
        <ProductDetailScreen />
    </Layout>
  )
}

export default ProductDetail

export async function getServerSideProps() {
  return {
    props: {},
  };
}