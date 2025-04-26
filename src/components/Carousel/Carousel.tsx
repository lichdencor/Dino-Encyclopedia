import React from 'react'

export const carousel = () => {
    return (
        <div className="carousel__container">
            <div className="carousel__container--left">
                <button className="carousel__btn" id="leftBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="currentColor" fill-rule="evenodd" d="m15 4l2 2l-6 6l6 6l-2 2l-8-8z" />
                    </svg>

                    <div className="carousel__container">
                        <div className="carousel__container--left">
                            <button className="carousel__btn" id="leftBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="currentColor" fill-rule="evenodd" d="m15 4l2 2l-6 6l6 6l-2 2l-8-8z" />
                                </svg>
                            </button>
                        </div>
                        <div className="carousel">
                            <div className="carousel__item carousel__item--left">
                                <div className="item__title">
                                    <h1>Countryside Vineyard Cottage</h1>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1666846795617-5a79453e6f6c?q=80&w=3402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="dog" />
                                <div className="carousel__text">
                                    <h3>€135 per night</h3>
                                    <p>
                                        🛏️ 2 Beds (1 queen, 1 single)<br />
                                        🍇 Vineyard tour included<br />
                                        🚴 Bike rental available<br />
                                    </p>
                                </div>
                            </div>
                            <div className="carousel__item carousel__item--main">
                                <div className="item__title">
                                    <h1>Alpine Peak Chalet</h1>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="dog" />
                                <div className="carousel__text">
                                    <h3>€210 per night</h3>
                                    <p>
                                        🛏️ 4 Beds (2 kings, 2 bunk beds)<br />
                                        ❄️ Ski-in/Ski-out access<br />
                                        🔥 Fireplace & underfloor heating<br />
                                    </p>
                                </div>
                            </div>
                            <div className="carousel__item carousel__item--right">
                                <div className="item__title">
                                    <h1>Seaside Breeze Bungalow</h1>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="dog" />
                                <div className="carousel__text">
                                    <h3>€145 per night</h3>
                                    <p>
                                        🛏️ 3 Beds (1 king, 2 singles)<br />
                                        🍳 Fully-equipped kitchen<br />
                                        🌊 Sea view terrace<br />
                                    </p>
                                </div>
                            </div>
                            <div className="carousel__item">
                                <div className="item__title">
                                    <h1>Seaside Breeze Bungalow</h1>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1677157072939-5fea75ed7384?q=80&w=3478&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="dog" />
                                <div className="carousel__text">
                                    <h3>€145 per night</h3>
                                    <p>
                                        🛏️ 3 Beds (1 king, 2 singles)<br />
                                        🍳 Fully-equipped kitchen<br />
                                        🌊 Sea view terrace<br />
                                    </p>
                                </div>
                            </div>
                            <div className="carousel__item">
                                <div className="item__title">
                                    <h1>Mystic Wood Cabin</h1>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1644167328999-fb8458f2d5a5?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="dog" />
                                <div className="carousel__text">
                                    <h3>€95 per night</h3>
                                    <p>
                                        🛏️ 2 Beds (1 queen, 1 sofa bed)<br />
                                        🔥 Indoor fireplace<br />
                                        🐶 Pet-friendly<br />
                                        🌐 No Wi-Fi (unplug & unwind)<br />
                                    </p>
                                </div>
                            </div>
                            <div className="carousel__item">
                                <div className="item__title">
                                    <h1>Seaside Breeze Bungalow</h1>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1509337547771-423a567a4c9a?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="dog" />
                                <div className="carousel__text">
                                    <h3>€145 per night</h3>
                                    <p>
                                        🛏️ 3 Beds (1 king, 2 singles)<br />
                                        🍳 Fully-equipped kitchen<br />
                                        🌊 Sea view terrace<br />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel__carousel--right">
                            <button className="carousel__btn" id="rightBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path fill="currentColor" fill-rule="evenodd" d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    )
}
