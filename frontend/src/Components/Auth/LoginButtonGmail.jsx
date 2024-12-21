import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const clientId = "185183656415-e7hnjo56pe6rjmr7fdqbgp2ci6qa73hn.apps.googleusercontent.com";

const LoginButtonGmail = () => {
  const navigate = useNavigate();

  const onSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential found in response.");
      }

      const decodedToken = jwtDecode(credentialResponse.credential);

      const response = await axios.post("http://127.0.0.1:8000/api/auth/google-login", {
        email: decodedToken.email,
        name: decodedToken.name,
        google_id: decodedToken.sub,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        toast.success("Connexion réussie ! Redirection...");
        navigate("/");
      } else {
        toast.error("L'utilisateur n'est pas inscrit.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Une erreur est survenue.");
    }
  };

  const onFailure = (error) => {
    console.error("Login failed:", error);
    toast.error("Connexion échouée. Veuillez réessayer.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onFailure}
        size="large"
        style={{ width: "100%" }}
      />
    </GoogleOAuthProvider>
  );
};

export default LoginButtonGmail;
