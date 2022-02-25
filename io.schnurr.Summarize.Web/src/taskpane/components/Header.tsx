import * as React from "react"

export interface HeaderProps {
    title: string
    logo: string
    message: string
}

const Header = (props: HeaderProps) => {
    return (
        <section className="ms-welcome__header ms-bgColor-neutralLighter ms-u-fadeIn500">
            <img width="90" height="90" src={props.logo} alt={props.title} title={props.title} />
            <h1 className="ms-fontSize-su ms-fontWeight-light ms-fontColor-neutralPrimary">
                {props.message}
            </h1>
        </section>
    )
}

export default Header
