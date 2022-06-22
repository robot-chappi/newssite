import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { useHttp } from '../hooks/http.hook';
import { Link } from "react-router-dom";
import Slider from '../components/slider/Slider';

export const World = () => {
    const [links, setLinks] = useState([])
    const {request, loading} = useHttp()

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/news/world', 'GET', null)
            setLinks(fetched)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    useEffect(() => {
        document.title = "World News 📣"
      }, []);

    if (loading) {
        return <Loader/>
    }
    return (
        <div className='news'>
            <div className='container'>
                <div className='row'>
                    <div className='style-slider'>
                        <Slider/>
                    </div>
                    <div className='news-name_all'>
                        <p>World News</p>
                    </div>
                        { links.map((link) => {
                            return (
                                <div key={link._id} class="card">
                                <img src={`http://localhost:5000/${link.img}`}/>
                                <div class="container-card">
                                    <h4><b>{link.header}</b></h4>
                                    <p>{link.subtitle}</p>
                                    <div className='container-card-link'>
                                        <Link className='container-card-link_link' to={`/pagenews/${link._id}`}>Open to read more</Link><i class="fa-solid fa-arrow-right-long container-card-link_link-icon"></i>
                                    </div>
                                </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}