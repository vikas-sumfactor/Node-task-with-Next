import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import styles from '../components/Signin.module.css'


const Signin = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false);

    const handleButtonClick = () => {
        setShowUserDetails(true);
    };

    useEffect(() => {
        let sessionTimeout: any;

        if (isLoggedIn) {
            sessionTimeout = setTimeout(() => {
                handleLogout();
            }, 2 * 60 * 1000);
        }

        return () => {
            clearTimeout(sessionTimeout);
        };
    }, [isLoggedIn]);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const data = {

            email,
            password

        };
        try {
            const response = await fetch('/api/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log({ response });
            if (response.ok) {
                setIsLoggedIn(true);
                console.log('successfully login');
            } else {
                alert("please register first");
                router.push('/');
            }
        } catch (error) {
            console.error('error in login', error);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail('');
        setPassword('');
    };
    const register = () => {
        router.push('/');
    }

    return (

        <div className={styles.container}>
            {isLoggedIn ? (

                <div>
                    <h2>hello, {email}!</h2>
                
                    <button onClick={handleLogout}>Sign Out</button>
                </div>
            ) : (
                <>
                    <form onSubmit={handleLogin}>
                        <h2>Sign In</h2>
                        <label>
                            Username:
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <br />
                        <br />
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <br />
                        <br />
                        
                        <button type="submit" className={styles.btn}>Sign In</button>

                    </form>
                </>

            )}
        </div>
    );
};

export default Signin;