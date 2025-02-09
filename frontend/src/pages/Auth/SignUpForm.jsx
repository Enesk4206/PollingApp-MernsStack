import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from "react-router-dom"
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector"
import AuthInput from "../../components/input/AuthInput"
import { validateEmail } from "../../utils/helper"
import { UserContext } from "../../context/UserProvider"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from '../../utils/apiPaths'
import uploadImage from '../../utils/uploadImage'

const SignUpForm = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = ""

        if (!fullName) {
            setError("Please enter user full name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please Enter a valid email address.");
            return;
        }
        if (!username) {
            setError("Please enter a username");
            return;
        }
        if (!password) {
            setError("Please enter a password");
            return;
        }

        setError("");

        //Signup API
        try {
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                username,
                profileImageUrl,
            });
            console.log(profileImageUrl)
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }

    }
    return (
        <AuthLayout>
            <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>Create an Account?</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp} >
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <AuthInput
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label={"Full Name"}
                            placeholder={"John Doe"}
                            type={"text"}
                        >

                        </AuthInput>
                        <AuthInput
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label={"Email Address"}
                            placeholder={"johndoe@example.com"}
                            type={"text"}
                        >

                        </AuthInput>

                        <AuthInput
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                            label={"User Name"}
                            placeholder={"@"}
                            type={"text"}
                        >

                        </AuthInput>
                        <AuthInput
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            label={"Password"}
                            placeholder={"Min 8 Characters"}
                            type={"password"}
                        >

                        </AuthInput>
                    </div>
                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                    <button className='btn-primary'>Sign Up</button>

                    <p className='text-[13px] text-slate-800 mt-3'>
                        Already have an account {""}
                        <Link to={"/login"} className='font-medium text-blue-600 underline'>Login</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default SignUpForm