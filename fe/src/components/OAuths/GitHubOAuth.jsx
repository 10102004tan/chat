const GithubOAuth = ({
    buttonText = "Login with Github",
}) => {
    const handleGithubOAuth = async () => {
        const clientID = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const redirectURI = import.meta.env.VITE_REACT_APP_API_URL + "/auth/github/callback";
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user`;
    };
    return (
        <button className="flex gap-2 bg-white items-center text-black px-3 rounded-sm" type="button" onClick={handleGithubOAuth}>
            <span className="icon-[mdi--github] text-xl"></span>
            <span className="text-sm text-gray-500">{buttonText}</span>
        </button>
    )
};

export default GithubOAuth;