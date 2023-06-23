import { Logo } from "components/logo"
import s from "./style.module.css"
import LogoSrc  from "assets/images/logo.png"
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary"
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AuthAPI } from "api/auth"
import { setUser } from "store/auth/auth-slice"
 export function Header(){
    const navigate=useNavigate();
    const user = useSelector((store)=>store.authSlice.auth.user);
    const dispatch=useDispatch();
    const signout= ()=>{
        AuthAPI.signout();
        dispatch(setUser(null));
    }
    const renderAuthProfile= ()=>{
        return <div>
            <img src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}`} style={{width:40}}
                className="rounded-circle"
            />
            <div>
                Hello, {user.email}
            </div>
            <Link to="#" onClick={signout}>SignOut</Link>
        </div>
    }
    return <div className={`row ${s.container}`}>
        <div className="col-xs-12 col-sm-4">
            <Logo title="Notomatic" subtitle="Manage your notes" image={LogoSrc} onClick={()=>{
                navigate("/")
            }}/>
        </div>
        <div className="col-xs-12 col-sm-8 text-end">
            {renderAuthProfile()}
        </div>
    </div>
 }