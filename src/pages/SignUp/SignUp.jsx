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
export function SignUp(){
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [password2, setPassword2]= useState("");
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const submit= async (e)=>{
        e.preventDefault();
        console.log(email,password);
        if(password===password2){
            try{
            const user = await AuthAPI.signup(email,password);
            dispatch(setUser(user));
            await toast("success", "Signup succeed, you are now logged in.")
            navigate("/")
            }catch(error){
                console.log("Auth Failed");
               await toast("error", error.message)
            }
        }
        else {
           await toast("error", "Password don't match")
        }
    }
    const form = (
        <div onSubmit={submit} className={s.fromContainer}>
            <h2 className={s.title}>
                Signup <br/>
                to access your team notes
            </h2>
            <form className={s.formGroup}>
                <Input placeholder={"Email"} onTextChange={setEmail}/>
                <Input placeholder={"password"} onTextChange={setPassword} type="password"/>
                <Input placeholder={"password repeat"} onTextChange={setPassword2} type="password"/>
                <ButtonPrimary type={"submit"} className={s.button}>
                    Sign up!
                </ButtonPrimary>
                <span>
                    Already have an account ? <Link to="/signin">Signin</Link>
                </span>
            </form>
        </div>
    )
    return <>
        <AuthLayout>{form}</AuthLayout>
    </>
}