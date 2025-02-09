const GithubOAuth = ({
    buttonText = "Login with Github",
}) => {
    const handleGithubOAuth = async () => {
        const clientID = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const redirectURI = import.meta.env.VITE_REACT_APP_API_URL + "/auth/github/callback";
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user`;
    };
    return (
        <button type="button" onClick={handleGithubOAuth}>
            
            <span>{buttonText}</span>
        </button>
    )
};

export default GithubOAuth;