import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const clientId = "185183656415-e7hnjo56pe6rjmr7fdqbgp2ci6qa73hn.apps.googleusercontent.com";

const LoginButtonGmail = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(localStorage.getItem('user'))
    console.log(localStorage.getItem('token'))
  }, [])
  const onSuccess = async (credentialResponse) => {
    try {
      const credentialResponseDecoded = jwtDecode(credentialResponse.credential);

      const response = await axios.post("http://localhost:8000/api/auth/google-login", {
        email: credentialResponseDecoded.email,
        name: credentialResponseDecoded.name,
        google_id: credentialResponseDecoded.sub,
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        toast.success("Connexion réussie ! Redirection...");

        navigate('/');
      } else {
        toast.error("L'utilisateur n'est pas inscrit.");

      }
    } catch (error) {
      toast.error("L'utilisateur n'est pas inscrit.");
    }
  };

  const onFailure = (error) => {
    toast.error("L'utilisateur n'est pas inscrit.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
          style={{ width: '100%' }} 
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginButtonGmail;
