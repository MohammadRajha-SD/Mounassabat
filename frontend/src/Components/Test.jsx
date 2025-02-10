import React, { useState } from "react";

export default function Test() {
    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePhoneNumberChange = (e) => {
        let value = e.target.value;

        // Allow only digits
        // value = value.replace(/\D/g, "");

        // Limit to 10 digits
        if (value.length > 10) return;

        // Update state only if it starts with 0 followed by 6, 7, or 8
        const regex = /^([06|07|08])\d{0,8}$/;

        // /^([678])\d{0,8}$/
        if (regex.test(value) || value === "") {
            setPhoneNumber(value);
        }
    };

    return (
        <div>
            <h1>{phoneNumber}</h1>
            <input
                id="phonenumber"
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="block w-full h-14 font-bold text-md py-2 px-2 mt-2 bg-white border border-gray-300 rounded-md focus:border-yellow-500 focus:outline-none focus:ring"
                required
            />
        </div>
    );
}
