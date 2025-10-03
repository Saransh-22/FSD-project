import React from "react";
import Navbar from "../component/navbar";

function Home() {
    
    return (
        <>
            <Navbar />
            <div style={{ padding: "2rem" }}>
                <h1>Welcome to the Home Page</h1>
                <p>This is a basic home page for your app.</p>
            </div>
        </>
    );
}

export default Home;