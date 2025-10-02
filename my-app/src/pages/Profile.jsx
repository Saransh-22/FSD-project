import React from "react";
import Navbar from "../component/navbar";

function Profile() {
    return (
        <>
            <Navbar />
            <div style={{ padding: "2rem" }}>
                <h1>Your Profile</h1>
                <p>This is your profile page.</p>
            </div>

        </>
    );
}

export default Profile;