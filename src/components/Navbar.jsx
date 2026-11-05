'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const Navbar = () => {
    const [state, setState] = useState(false);

    const menuHandler =  () => {
        
        if (state === false) {
            setState(true);
        } else {
            setState(false);
        }
        
    }
    return ( 

    <header>
        <nav>

            <Link href='/' className="logo">
            <Image src='/icons/logo.png' alt="logo" width={70} height={70}/>
              <p>Note-X</p>
            </Link>

                <div className={`menu-bar ${state? '': 'myclass'}`}>
                    <Link href='/'>Home</Link>
                    <Link href='/'>Dashboard</Link>
                    <Link href='/'>About</Link>
                    <Link href='/'>Contact</Link>
                </div>
                    
            <div className="menu" onClick={menuHandler}>
                MENU
            </div>
            <div>
                <button className="auth-button">Sign up</button>
                <button className="auth-button">Log in</button>
            </div>
            
        </nav>

        
    </header>

    );
}



export default Navbar;