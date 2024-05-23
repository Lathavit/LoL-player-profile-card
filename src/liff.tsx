import React, { useEffect, useState } from 'react';
import liff from '@line/liff';

const App = () => {
    const liffId = '2004857022-KJMLVyYa';
    const [displayName, setDisplayName] = useState<string>('');
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [pictureUrl, setPictureUrl] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);

    useEffect(() => {
        liff.init({
            liffId,
            withLoginOnExternalBrowser: true,
        }).then(() => {
            getProfile();
        });
    }, []);

    const getProfile = () => {
        liff.getProfile()
            .then((pf) => {
                console.log('pf => ', pf);
                setDisplayName(pf.displayName ?? ''); // Provide default value if undefined
                setStatusMessage(pf.statusMessage ?? ''); // Provide default value if undefined
                setPictureUrl(pf.pictureUrl ?? ''); // Provide default value if undefined
                setUserId(pf.userId ?? ''); // Provide default value if undefined
            })
            .catch((err) => {
                console.error('Error getting profile:', err);
            });
    };

    const logout = () => {
        liff.logout();
        setIsLogin(false);
        window.location.reload();
    };

    const login = () => {
        liff.init({
            liffId,
            withLoginOnExternalBrowser: true,
        }).then(() => {
            setIsLogin(true);
            getProfile();
        });
    };

    return (
        <div className="flex justify-center flex-col items-center">
            {isLogin && (
                <>
                    <img src={pictureUrl} width="200px" height="200px" className="rounded-full" alt="Profile" />
                    <div>displayName: {displayName}</div>
                    <div>statusMessage: {statusMessage}</div>
                    <div>userId: {userId}</div>
                    <button onClick={logout}>Logout</button>
                </>
            )}
            {!isLogin && (
                <>
                    <div>Please Login for details.</div>
                    <button onClick={login}>Login</button>
                </>
            )}
        </div>
    );
};

export default App;
