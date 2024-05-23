import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import { Avatar, CssBaseline } from '@mui/material';

const App = () => {
    const liffId = '2005345037-4XjR6xAY';
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
        <React.Fragment>
        <CssBaseline />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <Avatar src={pictureUrl} alt="Profile" sx={{ marginTop: 2, width: 200, height: 200 }} />
            <div>displayName: {displayName}</div>
            <div>statusMessage: {statusMessage}</div>
            <div>userId: {userId}</div>
        </div>
    </React.Fragment>
    );
};

export default App;
