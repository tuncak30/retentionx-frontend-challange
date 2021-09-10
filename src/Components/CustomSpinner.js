import {useEffect, useState} from "react";

function CustomSpinner(props){
    const [spinnerSrc, setSpinnerSrc] = useState(1);
    let intervalId;

    useEffect(() => {
        intervalId = setInterval(function (){
            setSpinnerSrc(previousSrc => previousSrc >= 7 ? previousSrc = 1 : previousSrc + 1)
        }, 500)
        return () => {
            clearInterval(intervalId);
        };
    }, [])
    return(
        <div id="spinner-glass">
            <div id="spinner-center-container">
                <img alt={spinnerSrc} className="spinner-images" src={`../img/spinner-images/${spinnerSrc}.png`}/>
                <p className="mt-2">Retreiving fruit data!</p>
            </div>
        </div>
    )
}
export default CustomSpinner;