import React from "react"

const Popup = (props) => {

    function onClick(event) {
        props.okClick(event)
    }

    return (
        <div style={{display: props.popupDisplay}} className="popup-container-div">
            <div className="popup-main-div">
                <p className="popup-p-tag">{props.number}</p>
                <p className="popup-sentin">{props.popupSentin}</p>
                <p className="popup-p-tag">{props.error}</p>
                <button onClick={onClick} className="generate-button">OK!</button>
            </div>
        </div>
    )
}

export default Popup