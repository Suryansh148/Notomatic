import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary"
import s from "./style.module.css"
import { Link } from "react-router-dom"
import { Input } from "components/Input/Input"
import { AuthLayout } from "Layouts/AuthLayout/AuthLayout"
import { useState } from "react"
import { setUser } from "store/auth/auth-slice"
import { AuthAPI } from "api/auth"
import { useDispatch } from "react-redux"
import { toast } from "utils/sweet-alert"
import { useNavigate } from "react-router-dom"
export function SignIn(){
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const submit= async (e)=>{
        e.preventDefault();
        console.log(email,password);
        try{
        const user = await AuthAPI.signin(email,password);
        dispatch(setUser(user));
        await toast("success", "Auth Succeed")
        navigate("/")
        }catch(error){
            console.log("Auth Failed");
            toast("error", error.message)
        }
    }
    const form = (
        <div onSubmit={submit} className={s.fromContainer}>
            <h2 className={s.title}>
                Signin <br/>
                to access your team notes
            </h2>
            <form className={s.formGroup}>
                <Input placeholder={"Email"} onTextChange={setEmail}/>
                <Input placeholder={"password"} onTextChange={setPassword} type="password"/>
                <ButtonPrimary type={"submit"} className={s.button}>
                    Sign in!
                </ButtonPrimary>
                <span>
                    Don't have an account yet ? <Link to="/signup">Signup</Link>
                </span>
            </form>
        </div>
    )
    return <>
        <AuthLayout>{form}</AuthLayout>
    </>
}