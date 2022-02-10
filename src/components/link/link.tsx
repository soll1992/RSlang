import React from 'react'
import { Link } from 'react-router-dom'
import './link.scss'

interface Props {
    textContent: string,
    link: string,
    class: string,
    divClass?: string
    onClick?: React.MouseEventHandler
}

export function NavLink(props: Props) {
    return (
        <>
            <Link onClick={props.onClick} className={props.class} to={props.link}>{props.textContent}</Link>
        </>
    )
}
