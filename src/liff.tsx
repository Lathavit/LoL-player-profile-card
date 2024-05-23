import React, { useEffect, useState } from 'react';
import liff from '@line/liff';

const App = () => {
    const liffId = '2004857022-KJMLVyYa';
    const [displayName, setDisplayName] = useState<string>('');
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [pictureUrl, setPictureUrl] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    // const logout = () => {
    //   liff.logout();
    // };

    useEffect(() => {
        // Update the document title using the browser API
        liff
            .init({
                liffId,
                withLoginOnExternalBrowser: true,
            })
            .then(() => {
                getProfile();
            });
    }, []);

    const getProfile = () => {
        liff
            .getProfile()
            .then((pf) => {
                console.log('pf => ', pf);
                setDisplayName(pf.displayName);
                setStatusMessage(pf.statusMessage);
                setPictureUrl(pf.pictureUrl);
                setUserId(pf.userId);
            })
            .catch((err) => { });
    }

    const logout = () => {
        liff.logout();
        setIsLogin(false);
        window.location.reload();
    }

    const login = () => {
        liff
            .init({
                liffId,
                withLoginOnExternalBrowser: true,
            })
            .then(() => {
                setIsLogin(true);
                getProfile();
            });
    }


    //liff.ready.then(() => {});

    return (
        <div className="flex justify-center flex-col items-center">
            {isLogin && (
                <>
                    <img src={pictureUrl} width="200px" height="200px" className="rounded-full" />
                    <div>displayName : {displayName} </div>
                    <div>statusMessage : {statusMessage} </div>
                    <div>userId : {userId}</div>
                    <button onClick={logout}> logout </button>
                </>
            )}
            {!isLogin && (
                <>
                    <div> Please Login for detail. </div>
                    {/* <button onClick = {login}> login </button> */}
                </>
            )}
        </div>
    );
};

export default App;
