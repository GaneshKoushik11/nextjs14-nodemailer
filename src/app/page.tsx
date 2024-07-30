"use client"
import React, { useState } from "react";
import axios from 'axios';
import toast from 'react-simple-toasts';
export default function Home(){
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<any>({});

    const handleValidation = () => {
        let tempErrors:any = {};
        let isValid = true;

        if (fullname.length <= 0) {
            tempErrors["fullname"] = true;
            isValid = false;
        }
        if (email.length <= 0) {
            tempErrors["email"] = true;
            isValid = false;
        }
        setErrors({ ...tempErrors });
        console.log("errors", errors);
        return isValid;
    };

    const sendMail = async () => {
        setIsLoading(true)
        toast('Email sending inprogress',{ position: 'top-center', className: 'info-toast' , duration: 3000 })
        try {
            let data = {
                fullname: fullname,
                email: email
            }
            const response = await axios.post('/api/sendgrid',{
                body: JSON.stringify(data)
            })
            setIsLoading(false)
            toast('Email sent successfully',{ position: 'top-center', className: 'success-toast' , duration: 3000 })
            setFullname("")
            setEmail("")
        } catch (error) {
            setIsLoading(false)
            console.log(error);
            toast('An error occurred while sending an email. Please try again later.',{ position: 'top-center', className: 'error-toast', duration: 3000 })
        }
    }

    const handleSubmit = async (event:any) => {
        event.preventDefault(); 
        const formData:any = new FormData(event.target);
        let isValidForm = handleValidation();
        if(isValidForm){
            setIsLoading(true)
            try {
                const response = await axios.post('/api/submit', formData);
                setIsLoading(false)
                toast('Form submitted successfully',{ position: 'top-center', className: 'success-toast' , duration: 3000 })
                setIsLoading(true)
                sendMail()
            } catch (error) {
                console.error('Error submitting form:', error);
                setIsLoading(false)
                toast('Error submitting form',{ position: 'top-center', className: 'error-toast' , duration: 3000 })
            }
        }
    };
    return(
        <main className="h-full max-w-sm m-auto mt-20">
            <form onSubmit={handleSubmit} className="rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white">
                <h1 className="text-2xl font-bold">
                    Send a message
                </h1>
                <label htmlFor="fullname" className="text-gray-500 font-light mt-8">
                    Name<span className="text-red-500">*</span>
                </label>
                <input type="text" value={fullname} onChange={(e) => { setFullname(e.target.value); }} name="fullname" className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md font-light text-gray-500"/>
                {errors?.fullname && (
                    <p className="text-red-500">Name is required</p>
                )}
                <label htmlFor="email" className="text-gray-500 font-light mt-8">
                    E-mail<span className="text-red-500">*</span>
                </label>
                <input type="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value); }} className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md font-light text-gray-500"/>
                {errors?.email && (
                    <p className="text-red-500">Email is required</p>
                )}
                <div className="flex flex-row items-center justify-start">
                    <button type="submit" disabled={isLoading} className="px-10 mt-8 py-2 bg-[#130F49] text-gray-50 font-light rounded-md text-lg flex flex-row items-center">
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </form>
        </main>
    )
}