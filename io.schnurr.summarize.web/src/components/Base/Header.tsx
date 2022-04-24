import * as React from "react"

export interface HeaderProps {
    title: string
    logo: string
    message: string
}

const Header = (props: HeaderProps) => {
    return (
        <section className="ms-welcome__header ms-bgColor-neutralLighter ms-u-fadeIn500 header-padding">
            <img width="30" height="30" src={props.logo} alt={props.title} title={props.title} />
            <h1 className="ms-fontSize-xl ms-fontWeight-light ms-fontColor-neutralPrimary">
                {props.message}
            </h1>
        </section>
    )
}

export default Header
