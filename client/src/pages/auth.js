import React, {useState, useContext, useEffect} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { getAuthCode } from '../hooks/mail.hook';
import { useMessage } from '../hooks/message.hook';
import {useNavigate} from 'react-router-dom'
import { SECRET_KEY } from '../utils/consts';
const CryptoJS = require("crypto-js");

export const Auth = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const navigate = useNavigate()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({email: '', password: ''})

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
      document.title = "Authorization ⚡️"
    }, []);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
      }

    const changePassword = () => {
      navigate(`/change`)
    }

    const generationCode = () => {
      const code = Math.floor(Math.random() * 999999999)
      registerHandler(code)
    }

    const registerHandler = async (code) => {
        try {
          const formData = new FormData()
          formData.append('email', form.email)
          formData.append('code', code)
          getAuthCode(formData)
          const hashCode = CryptoJS.AES.encrypt(code.toString(), `${SECRET_KEY}`);
          localStorage.setItem('CODE', JSON.stringify({'code': `${hashCode}`}))
          navigate(`/confirm/?email=${form.email}&password=${form.password}`)
        } catch (e) {}
      }
    
    const loginHandler = async () => {
        try {
          const data = await request('/api/auth/login', 'POST', {...form})
          console.log(data)
          auth.login(data.token, data.userId, data.admin)
        } catch (e) {}
      }

    return (
        <div className='auth-body'>
            <div class="main-auth">  	
		        <input type="checkbox" id="chk" aria-hidden="true"/>
			    <div class="signup">
				    <form>
					    <label for="chk" aria-hidden="true">Sign up</label>
					    <input id="email"
                        type="text"
                        name="email" placeholder="Email" value={form.email}
                        onChange={changeHandler}/>
					    <input id="password"
                        type="password"
                        name="password" placeholder="Password" value={form.password}
                        onChange={changeHandler}/>
					    <button onClick={generationCode} disabled={loading}>Sign up</button>
					    <button className='forgot_button' onClick={changePassword} disabled={loading}>Forgot password</button>
				    </form>
            
			    </div>

                <div class="login">
                    <form>
                        <label for="chk" aria-hidden="true">Login</label>
                        <input 
                        // id="email"
                         type="text" name="email" placeholder="Email" value={form.email}
                        onChange={changeHandler}/>
                        <input 
                        // id="password"
                         type="password" name="password" placeholder="Password" value={form.password}
                        onChange={changeHandler}/>
                        <button onClick={loginHandler} disabled={loading}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}