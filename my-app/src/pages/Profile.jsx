import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import ProfileCard from "../component/profile/profilecard";
import RecentActivity from "../component/profile/recentactivity";
import SavedPlans from "../component/profile/savedplans";
import AccountSettings from "../component/profile/accountsetting";

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // ✅ Get user from localStorage (set at login/signup)
        const storedUser = JSON.parse(localStorage.getItem("currentuser"));
        if (storedUser) setUser(storedUser);
    }, []);

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto mt-8 p-4">
                <h1 className="text-2xl font-bold mb-2">Profile</h1>
                <p className="mb-6 text-gray-600">
                    Manage your account and review your AI compliance activity.
                </p>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-6">
                        <ProfileCard user={user} />
                        <RecentActivity />
                    </div>
                    <div className="flex flex-col gap-6 w-full md:w-80">
                        <SavedPlans />
                        <AccountSettings />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
