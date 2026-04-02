import { useState, useEffect } from "react";
import OnboardingPopup from "./OnboardingPopup.jsx";
// import "../App.css";


function Onboarding({hidden, user, setAlreadyOnboarded}) {
    // const [showPopup, setShowPopup] = useState(false);
    // console.log("props: ", props);

    return(
        <div>
            <OnboardingPopup hidden={hidden} 
            user={user} setAlreadyOnboarded={setAlreadyOnboarded}/>
        </div>
    )
}

export default Onboarding;