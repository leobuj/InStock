import React from "react";
import MainScreen from "../../components/MainScreen/MainScreen";

const AboutUs = () => {
    return(
        <MainScreen title="AboutUs">
            <div className="container mt-4">
                <div className="row">
                        <h2>
                            We are a team dedicated to helping small business
                            owners keep track of their stock, shipments, and incoming
                            orders.
                        </h2>
                        <h2>
                            Add/remove items and specify their quantity!
                        </h2>
                        <h2>Make orders when stock is running low and track incoming said orders!</h2>
                        <h2>We are InStock! And we are here for you!</h2>
                </div>
            </div>
        </MainScreen>
    );
};

export default AboutUs;