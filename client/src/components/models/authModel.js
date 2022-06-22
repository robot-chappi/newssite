import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { SECRET_KEY } from '../../utils/consts';
import {useNavigate} from 'react-router-dom'
const CryptoJS = require("crypto-js");

export const AuthModal = (data, key) => {
    const {request} = useHttp()
    const navigate = useNavigate()
    const location = useLocation();
    const query = new URLSearchParams(location.search)
    const password = query.get('password')
    const email = query.get('email')
    

    const [form, setForm] = useState({email: email, password: password})
    const [inputCode, setInputCode] = useState('')

    
    const checkIt =  () => {
        const data = JSON.parse(localStorage.getItem('CODE'))
        const decCode = CryptoJS.AES.decrypt(data.code, `${SECRET_KEY}`);
        const plaintext = decCode.toString(CryptoJS.enc.Utf8);

        if (inputCode === plaintext) {
            request('/api/auth/register', 'POST', {...form})
            alert('Success!')
            return navigate(`/`)
        }
        alert('Error!')
        return navigate(`/`)
    }

    return (
        <div className='auth-body'>
            <div class="main-auth">  	
		        <input type="checkbox" id="chk" aria-hidden="true"/>
			    <div class="signup">
				    <form>
					    <label for="chk" aria-hidden="true">Check</label>
					    <input id="email"
                        type="text"
                        name="codename" placeholder="Code" 
                        value={inputCode} onChange={e => setInputCode(e.target.value)}
                        />
					    <button onClick={checkIt}>Complete</button>
				    </form>
            
			    </div>
            </div>
        </div>
    )
}