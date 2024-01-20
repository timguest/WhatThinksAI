import React from "react";

const DisplayOneUser = ({user}:any) => {
    const {first_name, last_name, age, gender, marital_status, education_level, employment_industry, income_level, area_type, location, children_amount, hobbies}=user;
    
    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <div className="rounded-lg p-4">
                        <h2 className="text-base font-semibold mb-4">User Information</h2>
                        <div>
                            <p className="text-sm"><span className="text-sm font-semibold">First Name:</span> {first_name}</p>
                            <p className="text-sm"><span className="text-sm font-semibold">Last Name:</span> {last_name}</p>
                            <p className="text-sm"><span className="text-sm font-semibold">Age:</span> {age}</p>
                            <p className="text-sm"><span className="text-sm font-semibold">Gender:</span> {gender}</p>
                            <p className="text-sm"><span className="text-sm font-semibold">Marital Status:</span> {marital_status}</p>
                            <p className="text-sm"><span className="text-sm font-semibold">Location:</span> {location}</p>


                            {/* Add other user details here */}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-4 mb-4">
                    <div className=" rounded-lg p-4">
                        <h2 className="text-base font-semibold mb-4">Additional Information</h2>
                        <div>
                            <p className="text-sm"><span className="text-sm font-semibold">Income level:</span> {income_level}</p>
                            <p className="text-sm"><span className="text-sm font-semibold">Education Level:</span> {education_level}</p>
                            <p className="text-sm"><span className="text-sm font-semibold">Type of Area:</span> {area_type}</p>
                            <p className="text-sm"><span className="text-sm font-semibold">Employment Industry:</span> {employment_industry}</p>
                            <p className="text-sm"><span className="text-sm font-semibold">Children Amount:</span> {children_amount}</p>
                            <p className="text-sm"><span className="text-sm font-semibold">Hobbies:</span> {hobbies}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayOneUser;