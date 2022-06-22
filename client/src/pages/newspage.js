import React, { useState, useContext, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import {useParams} from 'react-router-dom'
import { getNews, likeNews, dontlikeNews, makeComment, getComments, deleteComment, deleteNews, setImportant, setUnImportant } from '../hooks/get_one.hook';
import moment from 'moment';

export const NewsPage = () => {
    const auth = useContext(AuthContext)
    const [link, setLinkTwo] = useState(null)
    const [load, setload] = useState(true)
    const [cool, setCool] = useState(0)
    const [createCommentDone, setCreateCommentDone] = useState(0)
    const [deleteCommentDone, setDeleteCommentDone] = useState(0)
    const [userIdComment, setUserIdComment] = useState('')
    const [userName, setUserName] = useState('')
    const [userText, setUserText] = useState('')
    const [commentData, setCommentData] = useState([])
    const linkId = useParams().id

    const createComment = async () => {
        try {
            const data = await JSON.parse(localStorage.getItem('userData'))

            const formData = new FormData()
            formData.append('id', data.userId)
            formData.append('userName', userName)
            formData.append('userText', userText)
            formData.append('newsId', linkId)
            makeComment(formData)
            setUserName('')
            setUserText('')
            setCreateCommentDone(createCommentDone+1)
        } catch (e) {
        }
      }

    const removeNews = async () => {
        try {
            deleteNews(linkId)
        } catch (e) {
        }
      }

    const upNews = async () => {
        try {
            setImportant(linkId)
        } catch (e) {
        }
      }

    const downNews = async () => {
        try {
            setUnImportant(linkId)
        } catch (e) {
        }
      }

    const removeComments = async (commentId) => {
        try {
            deleteComment(commentId)
            setDeleteCommentDone(deleteCommentDone+1)
        } catch (e) {
        }
      }

    const copy = () => {
        const newsCopy = link.header
        const url = document.location.href
        navigator.clipboard.writeText(`${newsCopy} --- \n\n${url}`)
        .then(() => {
            console.log(url)
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
    }

    const like = () => {
        if (cool === 0) {
            setCool(1)
            return likeNews(linkId)
        }
        setCool(0)
        return dontlikeNews(linkId)
    }

    useEffect(() => {
        getComments(linkId).then(data => setCommentData(data))
        getNews(linkId).then(data => setLinkTwo(data)).finally(() => setload(false))
    }, [getNews, cool, createCommentDone, deleteCommentDone])

    useEffect(() => {
        document.title = "You're reading... 👨‍💼"
      }, []);

    if (load) {
        return <Loader/>
    }

    if (auth.isAdmin === 1) {
        return (
            <div className='newspage'>
                <div className='container'>
                    <div className='row'>
                        <div className='newspage-news'>
                            <div className='newspage-news_img'>
                                <img src={`http://localhost:5000/${link.img}`}/>
                            </div>
                            <div className='newspage-news_content'>
                                <h4>{link.header}</h4>
                                <p>{link.subtitle}</p>
                                <div className='newspage-news_content-text'>
                                    {link.content}
                                </div>
                                <div className='newspage-news_content-author'>
                                    -{link.author}
                                </div>
                            </div>
                            <div className='newspage-news-statistic'>
                                <p>{link.likes}</p><i class="fa-solid fa-heart newspage-news-statistic_icon-i"></i>
                            </div>
                            <div className='newspage-news-more'>
                                <div className='newspage-news-more_icon'>
                                    <i onClick={like} class="fa-solid fa-heart newspage-news-more_icon-i"></i>
                                </div>
                                <div className='newspage-news-more_icon'>
                                    <i onClick={copy} class="fa-solid fa-square-share-nodes newspage-news-more_icon-i"></i>
                                </div>
                                <div className='newspage-news-more_icon'>
                                    <i onClick={removeNews} class="fa-solid fa-circle-minus newspage-news-more_icon-i"></i>
                                </div>
                                <div className='newspage-news-more_icon'>
                                    
                                    <i onClick={upNews} class="fa-solid fa-arrow-trend-up newspage-news-more_icon-i"></i>
                                </div>
                                <div className='newspage-news-more_icon'>
                                    <i onClick={downNews} class="fa-solid fa-arrow-trend-down newspage-news-more_icon-i"></i>
                                </div>
                            </div>
                            <div className='newspage-news-comments'>
                                <div className='newspage-news-comments_name'>
                                    <p>Create a comment</p>
                                </div>
                                <div className='newspage-news-comments_form'>
                                    <input onChange={e => setUserName(e.target.value)}
                                    value={userName} placeholder='Your name...' className='newspage-news-comments_form-input'/>
                                    <textarea onChange={e => setUserText(e.target.value)}
                                    value={userText} placeholder='Your comment...' className='newspage-news-comments_form-textarea'/>
                                    <button onClick={createComment} className='newspage-news-comments_form-button'>Comment</button>
                                </div>
                            </div>
                            <div className='newspage-news-allcomments'>
                                <div className='newspage-news-allcomments_name'>
                                    <p>Comments</p>
                                </div>
                                <div className='cards-comment'>
                                    { commentData.map((commentUser) => {
                                        return (
                                            <div key={commentUser._id} className='card-comment-view'>
                                                <div  class="card-comment card-1-comment">
                                                    <div class="card__icon-comment"><i class="fa-solid fa-user"></i> {commentUser.name}</div>
                                                    <p  class="card__exit-commentt"><i onClick={() => removeComments(commentUser._id)} class="fas fa-times"></i></p>
                                                    <h2 class="card__title-comment">{commentUser.text}</h2>
                                                    <div class="card__apply-comment">
                                                        <p class="card__link-comment"><i class="fa-solid fa-calendar"></i> {moment(`${commentUser.time}`).format("LLL")} </p>
                                                </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='newspage'>
            <div className='container'>
                <div className='row'>
                    <div className='newspage-news'>
                        <div className='newspage-news_img'>
                            <img src={`http://localhost:5000/${link.img}`}/>
                        </div>
                        <div className='newspage-news_content'>
                            <h4>{link.header}</h4>
                            <p>{link.subtitle}</p>
                            <div className='newspage-news_content-text'>
                                {link.content}
                            </div>
                            <div className='newspage-news_content-author'>
                                -{link.author}
                            </div>
                        </div>
                        <div className='newspage-news-statistic'>
                            <p>{link.likes}</p><i class="fa-solid fa-heart newspage-news-statistic_icon-i"></i>
                        </div>
                        <div className='newspage-news-more'>
                            <div className='newspage-news-more_icon'>
                                <i onClick={like} class="fa-solid fa-heart newspage-news-more_icon-i"></i>
                            </div>
                            <div className='newspage-news-more_icon'>
                                <i onClick={copy} class="fa-solid fa-square-share-nodes newspage-news-more_icon-i"></i>
                            </div>
                        </div>
                        <div className='newspage-news-comments'>
                            <div className='newspage-news-comments_name'>
                                <p>Create a comment</p>
                            </div>
                            <div className='newspage-news-comments_form'>
                                <input onChange={e => setUserName(e.target.value)}
                                value={userName} placeholder='Your name...' className='newspage-news-comments_form-input'/>
                                <textarea onChange={e => setUserText(e.target.value)}
                                value={userText} placeholder='Your comment...' className='newspage-news-comments_form-textarea'/>
                                <button onClick={createComment} className='newspage-news-comments_form-button'>Comment</button>
                            </div>
                        </div>
                        <div className='newspage-news-allcomments'>
                            <div className='newspage-news-allcomments_name'>
                                <p>Comments</p>
                            </div>
                            <div className='cards-comment'>
                                { commentData.map((commentUser) => {
                                    return (
                                        <div key={commentUser._id} className='card-comment-view'>
                                            <div  class="card-comment card-1-comment">
                                                <div class="card__icon-comment"><i class="fa-solid fa-user"></i> {commentUser.name}</div>
                                                {/* <p class="card__exi-commentt"><i class="fas fa-times"></i></p> */}
                                                <h2 class="card__title-comment">{commentUser.text}</h2>
                                                <div class="card__apply-comment">
                                                    <p class="card__link-comment"><i class="fa-solid fa-calendar"></i> {moment(`${commentUser.time}`).format("LLL")} </p>
                                            </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}