import React, { useEffect } from 'react';
import { auth, googleProvider } from "../config/firebase";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { Button } from 'primereact/button';

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        /* Verifica si el usuario está autenticado */
        if (localStorage.getItem("firebaseToken")) {
            navigate("/");
        }
    }, []);

    const handleSignIn = async () => {
        try {
            localStorage.removeItem("firebaseToken");
            
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken();

            localStorage.setItem("firebaseToken", idToken);

            let response = await axios.post("https://deploybackendtp-44411f5799d1.herokuapp.com/login", { firebaseToken: idToken });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.usuario));

            window.dispatchEvent(new Event("login"));

            navigate("/");
        } catch (error) {
            console.error('Error en el inicio de sesión con Google: ', error);
        }
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("firebaseToken");
        } catch (error) {
            console.error('Error al cerrar sesión: ', error);
        }
    }
 
    return (
        <div className='flex align-items-center justify-content-center login'>
            <div className="flex flex-column align-items-center justify-content-center">
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-2 sm:px-2 " style={{ borderRadius: '53px' }}>
                        <div className='flex justify-content-center mb-3'>
                            <img src="https://i.ibb.co/m0twp4Z/pngwing-com-4.png" alt="pngwing-com" className='w-1 h-1'></img>
                        </div>

                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Welcome!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <div className='my-3 flex justify-content-center'>
                                <Button icon="pi pi-google" label="Sign in with Google" rounded outlined onClick={handleSignIn} className='mx-2' />
                                <Button icon="pi pi-trash" label="Sign out" severity='danger' rounded outlined onClick={handleLogout} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default LoginPage;
 