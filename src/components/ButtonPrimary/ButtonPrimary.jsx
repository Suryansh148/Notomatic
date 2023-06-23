import { Children } from "react"
import s from "./style.module.css"
export function ButtonPrimary({className,type,children,onClick, isDisabled}){
    return <div>
        <button disabled={isDisabled} onClick={onClick} type={type} className={`btn btn-primary ${s.button} ${className}`}>
            {children}
        </button>
    </div>
}