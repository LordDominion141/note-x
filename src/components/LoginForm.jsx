'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();

    const [ form, setForm ] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || `Login failed (${res.status})`);
                return;
            }
            console.log('Login successful:', data);
            router.replace('/pages/dashboard');
        } catch (requestError) {
            console.error('Login request failed:', requestError);
            setError('Could not reach the login service. Check your connection and try again.');
        }
    }


    return ( <main>
        <div className="signup-container bg-[url('/images/image3.jpg')]">
            <div className="signup-card">

                <div className="signup-visual">
                    <Image src='/images/signup.png' loading="eager" alt='Image' width={400} height={400} className="signup-image"/>
                </div>

                <div className="form-wrap">

                    <form onSubmit={handleSubmit} className="signup-form">
                        <h2>WELCOME BACK</h2>
                        <p>Sign in to your Note-X account.</p>
                            
                            <label htmlFor='email'>Email</label>
                            <input
                            value={form.email}
                            onChange={(e) => {setForm({...form, email: e.target.value})}}
                             id="email" type="email" autoComplete="email" required placeholder="youremail@gmail.com"/>

                            <label htmlFor='password'>Password</label>
                            <input
                            value={form.password}
                            onChange={(e) => {setForm({...form, password: e.target.value})}}
                             id="password" type="password" autoComplete="current-password" required placeholder="yourpassword123"/>

                            {error && <p role="alert" className="text-red-700">{error}</p>}
                            <button type="submit">Sign In</button>
                        <p className="signin-paragraph">Don&apos;t have an account yet? <Link href='/pages/signup'>Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    </main>  );
}
 
export default LoginForm;