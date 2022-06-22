import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { changeOldPassword } from '../../../hooks/get_one.hook';
const CryptoJS = require("crypto-js");

export const PasswordChange = () => {
    const [newPassword, setNewPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation();
    const query = new URLSearchParams(location.search)
    const emailURL = query.get('email')

    const changeIt =  () => {
        const formData = new FormData()
        formData.append('email', emailURL)
        formData.append('password', newPassword)
        localStorage.setItem('TESTING', JSON.stringify({'pswd': `${newPassword}`}))
        changeOldPassword(formData)
        alert('Success!')
        navigate(`/`)
    }

    return (
        <div className='auth-body'>
            <div class="main-auth">  	
		        <input type="checkbox" id="chk" aria-hidden="true"/>
			    <div class="signup">
				    <form>
					    <label for="chk" aria-hidden="true">Your new password</label>
					    <input id="email"
                        type="text"
                        name="password" placeholder="Password" 
                        value={newPassword} onChange={e => setNewPassword(e.target.value)}
                        />
					    <button onClick={changeIt}>Change</button>
				    </form>
			    </div>
            </div>
        </div>
    )
}