import { GoogleLogin } from "react-google-login";
const GoogleOAuth = ({ buttonText, onSuccess, onFailure }) => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return (
        <GoogleLogin
            clientId={clientId}
            buttonText={buttonText}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            type="button"
        />
    );
};

export default GoogleOAuth;