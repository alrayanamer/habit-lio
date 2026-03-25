import { useState, useEffect } from "react";

// import "../App.css";

function OnboardingPopup() {
    const [showPopup, setShowPopup] = useState(false);

    return(
        <div>
            <p>You must be new here. Let's get you set up!</p>
        </div>
    );
}

export default OnboardingPopup;