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
        <div className="flex w-full items-center justify-center bg-[url('/images/image2.jpg')] bg-cover bg-center py-10 max-sm:py-6">
            <div className="mx-10 my-10 flex w-full max-w-300 flex-row overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg shadow-gray-500 max-sm:w-full max-sm:min-h-150 max-sm:flex-col">

                <div className="flex min-w-0 flex-1 max-sm:h-70 max-sm:flex-none">
                    <Image src='/images/signup.png' alt='Image' width={400} height={400} className="block h-full w-full object-cover"/>
                </div>

                <div className="flex flex-1 items-center justify-center">

                    <form onSubmit={handleSubmit} className="flex w-87.5 flex-col justify-center gap-7 px-10 py-16 max-sm:gap-5 max-sm:px-8">
                        <h2 className="mb-0 text-[28px] text-gray-800">WELCOME TO NOTE-X</h2>
                        <p className="m-0 mb-3 text-[17px] tracking-widest text-gray-700">Signup for note-x to get started.</p>
                            <label className="text-[16px] text-gray-900" htmlFor='name'>Name</label>
                            <input 
                               className="rounded-md border border-gray-300 p-2 shadow-none outline-none transition-colors hover:border-[#b51026]"
                               value={form.name}
                               onChange={(e) => {setForm({...form, name: e.target.value})}}
                             id="name" type="text" autoComplete="name" required minLength={3} placeholder="yourname"/>


                                     <label className="text-[16px] text-gray-900" htmlFor='email'>Email</label>
                            <input
                                         className="rounded-md border border-gray-300 p-2 shadow-none outline-none transition-colors hover:border-[#b51026]"
                               value={form.email}
                               onChange={(e) => {setForm({...form, email: e.target.value})}}
                             id="email" type="email" autoComplete="email" required placeholder="youremail@gmail.com"/>


                                     <label className="text-[16px] text-gray-900" htmlFor='password'>Password</label>
                            <input
                                         className="rounded-md border border-gray-300 p-2 shadow-none outline-none transition-colors hover:border-[#b51026]"
                               value={form.password}
                               onChange={(e) => {setForm({...form, password: e.target.value})}}
                            id="password" type="password" autoComplete="new-password" required minLength={6} placeholder="yourpassword123"/>

                            {error && <p role="alert" className="m-0 text-sm text-red-700">{error}</p>}
                            <button className="mt-5 rounded-md border border-red-400 bg-[#b51026] px-2 py-2 text-[15px] text-white shadow-none transition-colors hover:bg-[#840f1e]" type="submit">Sign Up</button>
                        <p className="m-0 mb-3 text-center text-[15px] tracking-normal text-gray-700">Already have an account? <Link className="text-[#b51026] no-underline" href='/pages/login'>Sign In</Link></p>
                        <p className="m-0 mb-3 text-center text-[15px] tracking-normal"><Link className="text-[#b51026] no-underline" href='/'>Home</Link></p>
                    </form>
                </div>
            </div>
        </div>
    </main> 
    );
}


export default Signup;