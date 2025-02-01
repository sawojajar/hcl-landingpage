import React, { ReactNode } from 'react'
import { Navbar } from './navbar';
import { Footer } from './footer';

type LayoutProps = {
    children: ReactNode;
    navbarBackground?: string;
}

export const Layout = (props: LayoutProps) => {
    return (
        <>
            <Navbar background={props.navbarBackground} />
            {props.children}
            <Footer />
        </>
    )
}
