import React, {useState, useEffect} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import {Form} from 'react-bootstrap'
import { createOneNews } from '../hooks/upload.hook';
import { sendEveryone } from '../hooks/mail.hook';


export const Admin = () => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [typeNewsOf, setTypeNewsOf] = useState(null)
    const [importantNewsOf, setImportantNewsOf] = useState(null)
    const [headerOf, setHeaderOf] = useState('')
    const [subtitleOf, setSubtitleOf] = useState('')
    const [contentOf, setContentOf] = useState('')
    const [authorOf, setAuthorOf] = useState('')

    const [headerMailing, setHeaderMailing] = useState('')
    const [themeMailing, setThemeMailing] = useState('')
    const [contentMailing, setContentMailing] = useState('')
    const [imgMailing, setImgMailing] = useState('')
    const [linkMailing, setLinkMailing] = useState('')

    const [imageOf, setImageOf] = useState(null)

    const createNews = async () => {
        try {
            const formData = new FormData()
            formData.append('typeNews', typeNewsOf)
            formData.append('typeImportant', importantNewsOf)
            formData.append('header', headerOf)
            formData.append('subtitle', subtitleOf)
            formData.append('content', contentOf)
            formData.append('author', authorOf)
            formData.append('img', imageOf)
            createOneNews(formData)
        } catch (e) {
        }
      }

    const mailingEveryone = async () => {
        try {
            const formData = new FormData()
            formData.append('header', headerMailing)
            formData.append('theme', themeMailing)
            formData.append('content', contentMailing)
            formData.append('img', imgMailing)
            formData.append('link', linkMailing)
            sendEveryone(formData)
        } catch (e) {
        }
      }

    const selectFile = e => {
        setImageOf(e.target.files[0])
    }

    useEffect(() => {
        document.title = "Admin 🧠"
    }, []);

    return (
        <div className='admin'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='admin-name-page'>
                            <p>Admin Panel</p>
                        </div>
                        <div className='admin-create-news'>
                            <div className='admin-create-news_name'>
                                <p>Create News</p>
                            </div>
                            <div className='admin-create-news_form'>
                            <form>
                                <input id="text"
                                className='admin-create-news_form-input'
                                type="number"
                                name="typeNews" placeholder="Type: 1 - Russia, 2 - World" 
                                onChange={e => setTypeNewsOf(e.target.value)}
                                value={typeNewsOf}
                                />
                                <input id="text"
                                className='admin-create-news_form-input'
                                type="number"
                                name="typeImportant" placeholder="Important? 1 - yes, 0 - no" 
                                onChange={e => setImportantNewsOf(e.target.value)}
                                value={importantNewsOf}
                                />
                                <input id="text"
                                className='admin-create-news_form-input'
                                type="text"
                                name="header" placeholder="Header" 
                                onChange={e => setHeaderOf(e.target.value)}
                                value={headerOf}
                                />
                                <input id="text"
                                className='admin-create-news_form-input'
                                type="text"
                                name="subtitle" placeholder="Subtitle" 
                                onChange={e => setSubtitleOf(e.target.value)}
                                value={subtitleOf}
                                />
                                <textarea id="text"
                                className='admin-create-news_form-textarea'
                                type="text"
                                name="content" placeholder="Content" 
                                onChange={e => setContentOf(e.target.value)}
                                value={contentOf}
                                />
                                <Form.Control
                                className='admin-create-news_form-input-react'
                                    type="file"
                                    name='img'
                                    onChange={selectFile}
                                    
                                />
                                <input id="text"
                                className='admin-create-news_form-input'
                                type="text"
                                name="author" placeholder="Author" 
                                onChange={e => setAuthorOf(e.target.value)}
                                value={authorOf}
                                />
                                <button onClick={createNews}>Create</button>
                            </form>
                            </div>
                        </div>
                        <div className='admin-create-news'>
                            <div className='admin-create-news_name'>
                                <p>Mailing</p>
                            </div>
                            <div className='admin-create-news_form'>
                            <form>
                                <input id="text"
                                className='admin-create-news_form-input'
                                type="text"
                                name="text" placeholder="Header" 
                                onChange={e => setHeaderMailing(e.target.value)}
                                value={headerMailing}
                                />
                                <input id="text"
                                className='admin-create-news_form-input'
                                type="text"
                                name="text" placeholder="Theme" 
                                onChange={e => setThemeMailing(e.target.value)}
                                value={themeMailing}
                                />
                                <textarea id="text"
                                className='admin-create-news_form-textarea'
                                type="text"
                                name="text" placeholder="Content" 
                                onChange={e => setContentMailing(e.target.value)}
                                value={contentMailing}
                                />
                                <input id="text"
                                className='admin-create-news_form-input'
                                type="text"
                                name="text" placeholder="Image (url)" 
                                onChange={e => setImgMailing(e.target.value)}
                                value={imgMailing}
                                />
                                <input id="text"
                                className='admin-create-news_form-input'
                                type="text"
                                name="text" placeholder="Link" 
                                onChange={e => setLinkMailing(e.target.value)}
                                value={linkMailing}
                                />
                                <button onClick={mailingEveryone}>Send everyone</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}