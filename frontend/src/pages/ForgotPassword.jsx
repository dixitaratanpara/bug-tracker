import { useState } from "react";

function ForgotPassword(){

    const [email,setEmail] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();

        console.log(email);
    };

    return(
         <div className="auth-container">

            <form className="auth-form" onSubmit={handleSubmit}>

                <h2>Forgot Password</h2>

                <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit">
                    Send Reset Link
                </button>

            </form>

        </div>

    );

}
export default ForgotPassword;