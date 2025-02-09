import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const GitHubCallback = () => {
    const { oauthWithGithub } = useAuthStore();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            oauthWithGithub({ code });

            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }, []);

    return (
        <div className='flex items-center justify-center h-screen bg-white'>
            Logging in...
        </div>
    )
}

export default GitHubCallback;