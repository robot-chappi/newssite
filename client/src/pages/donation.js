import React, {useEffect} from 'react';
import Logo from '../images/donationImage.svg'

export const Donation = () => {

    useEffect(() => {
        document.title = "Donation 💸"
        window.scrollTo(0, 0);
      }, []);

    return (
        <div className='donation-page'>
            <div className='container'>
                <div className='row'>
                    <div className='col-6 col-xs-6 col-md-6 col-lg-6'>
                        <div className='donation-page-contant-one'>
                            <div className='donation-page-name'>
                                <h4>Support Me</h4>
                            </div>
                            <div className='donation-page-text'>
                                Hi, my name is Daniel and I am the creator of this site in MERN Technology. You are free to use this site and distribute its code. You can support me and my projects that you can use for educational purposes or in production freely!
                            </div>
                            <div className='donation-page-form'>
                            <iframe width="728" height="200" src="https://widget.qiwi.com/widgets/big-widget-728x200?publicKey=48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPqrKs7gdcTfBnhawcxrY1DB4gdHUAxAhYJ9C9V9unkTbx4ntmLkrHMCejpvdEdTqjja1wrEKsjrxdBYCca3VgYkaH1kjWredLptSyocKMF" allowtransparency="true" scrolling="no" frameborder="0"></iframe>
                            </div>
                            <div className='donation-page-form-two'>
                                <iframe width="300" height="300" src="https://widget.qiwi.com/widgets/middle-widget-300x300?publicKey=48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPqrKs7gdcTfBnhawcxrY1DB4gdHUAxAhYJ9C9V9unkTbx4ntmLkrHMCejpvdEdTqjja1wrEKsjrxdBYCca3VgYkaH1kjWredLptSyocKMF" allowtransparency="true" scrolling="no" frameborder="0"></iframe>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-lg-6 hidden-sm hidden-xs'>
                        <div className='donation-page-img'>
                            <img src={Logo}/>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    )
}