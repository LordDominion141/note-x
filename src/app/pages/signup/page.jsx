'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {

    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || `Signup failed (${res.status})`);
                return;
            }
            console.log('Signup success:', data);
            router.replace('/pages/dashboard');
        } catch (requestError) {
            console.error('Signup request failed:', requestError);
            setError('Could not reach the signup service. Check your connection and try again.');
        }
    }


    return (
    <main>
        <div className="signup-container bg-[url('/images/image2.jpg')]">
            <div className="signup-card">

                <div className="signup-visual">
                    <Image src='/images/signup.png' alt='Image' width={400} height={400} className="signup-image"/>
                </div>

                <div className="form-wrap">

                    <form onSubmit={handleSubmit} className="signup-form">
                        <h2>WELCOME TO NOTE-X</h2>
                        <p>Signup for note-x to get started.</p>
                            <label htmlFor='name'>Name</label>
                            <input 
                               value={form.name}
                               onChange={(e) => {setForm({...form, name: e.target.value})}}
                             id="name" type="text" autoComplete="name" required minLength={3} placeholder="yourname"/>


                            <label htmlFor='email'>Email</label>
                            <input
                               value={form.email}
                               onChange={(e) => {setForm({...form, email: e.target.value})}}
                             id="email" type="email" autoComplete="email" required placeholder="youremail@gmail.com"/>


                            <label htmlFor='password'>Password</label>
                            <input
                               value={form.password}
                               onChange={(e) => {setForm({...form, password: e.target.value})}}
                            id="password" type="password" autoComplete="new-password" required minLength={6} placeholder="yourpassword123"/>

                            {error && <p role="alert" className="text-red-700">{error}</p>}
                            <button type="submit">Sign Up</button>
                        <p className="signin-paragraph">Already have an account? <Link href='/pages/login'>Sign In</Link></p>
                    </form>
                </div>
            </div>
        </div>
    </main> 
    );
}


export default Signup;