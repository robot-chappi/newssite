import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { SECRET_KEY } from '../../../utils/consts';
const CryptoJS = require("crypto-js");

export const CodeChange = () => {
    const [inputCode, setInputCode] = useState('')

    const navigate = useNavigate()
    const location = useLocation();
    const query = new URLSearchParams(location.search)
    const emailURL = query.get('email')

    const checkIt =  () => {
        const data = JSON.parse(localStorage.getItem('CODETOCHANGE'))
        const decCode = CryptoJS.AES.decrypt(data.code, `${SECRET_KEY}`);
        const plaintext = decCode.toString(CryptoJS.enc.Utf8);
        

        if (inputCode === plaintext) {
            return navigate(`/newpassword/?email=${emailURL}`)
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
					    <label for="chk" aria-hidden="true">Your code</label>
					    <input id="email"
                        type="text"
                        name="codename" placeholder="Code" 
                        value={inputCode} onChange={e => setInputCode(e.target.value)}
                        />
					    <button onClick={checkIt}>Continue</button>
				    </form>
			    </div>
            </div>
        </div>
    )
}