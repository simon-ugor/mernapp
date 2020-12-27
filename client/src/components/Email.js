import React from "react"

const Email = (props) => {

    function onChange(event) {
        props.handleChange(event)
    }

    function onClick(event) {
        props.handleClick(event)
    }

    return (
        <div className="main-email-div">
            <form>
                <h4 className="button-label">Enter your e-mail:</h4>
                <input value={props.value} placeholder="example@example.com" className="email-input" onChange={onChange} type="email"></input>
                <h4 className="button-label">Generete random number:</h4>
                <button className="generate-button" onClick={onClick}>Generate</button>
            </form>
        </div>
    )
}

export default Email