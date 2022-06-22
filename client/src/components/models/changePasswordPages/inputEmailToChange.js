import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { getAuthCode } from '../../../hooks/mail.hook';
import { SECRET_KEY } from '../../../utils/consts';
const CryptoJS = require("crypto-js");

export const EmailChange = () => {
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const generationCode = () => {
        const code = Math.floor(Math.random() * 999999999)
        registerHandler(code)
      }
  
      const registerHandler = async (code) => {
          try {
            const formData = new FormData()
            formData.append('email', email)
            formData.append('code', code)
            getAuthCode(formData)
            const hashCode = CryptoJS.AES.encrypt(code.toString(), `${SECRET_KEY}`);
            localStorage.setItem('CODETOCHANGE', JSON.stringify({'code': `${hashCode}`}))
            navigate(`/confirmpassword/?email=${email}`)
            
          } catch (e) {}
        }

    return (
        <div className='auth-body'>
            <div class="main-auth">  	
		        <input type="checkbox" id="chk" aria-hidden="true"/>
			    <div class="signup">
				    <form>
					    <label for="chk" aria-hidden="true">Your email</label>
					    <input id="email"
                        type="text"
                        name="codename" placeholder="Email" 
                        value={email} onChange={e => setEmail(e.target.value)}
                        />
					    <button onClick={generationCode}>Continue</button>
				    </form>
			    </div>
            </div>
        </div>
    )
}