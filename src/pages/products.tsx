import { Layout } from '@/components/layout'
import { ProductsScreen } from '@/screen/ProductsScreen'
import React from 'react'

const Products = () => {
  return (
    <Layout navbarBackground='unset'>
        <ProductsScreen />
    </Layout>
  )
}

export default Products