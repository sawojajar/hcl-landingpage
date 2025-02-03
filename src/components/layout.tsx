import React, { ReactNode } from 'react'
import { Navbar } from './navbar';
import { Footer } from './footer';
import { useCategories } from '@/modules/products/useProducts';

type LayoutProps = {
    children: ReactNode;
    navbarBackground?: string;
}

export const Layout = (props: LayoutProps) => {
    const { data: categories, isLoading } = useCategories();
    return (
        <>
            <Navbar background={props.navbarBackground} categoryData={categories} isLoading={isLoading} />
            {props.children}
            <Footer />
        </>
    )
}
