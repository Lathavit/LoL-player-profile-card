import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar'; // เพิ่ม Avatar จาก Material-UI
import liff from '@line/liff';

interface NavbarProps {
    setUsername: (username: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setUsername }) => {
    const liffId: string = '2005345037-4XjR6xAY';
    const [displayName, setDisplayName] = useState<string>('');
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [pictureUrl, setPictureUrl] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const handleButtonClick = () => {
        // Handle button click logic here
        // For now, let's just log a message
        console.log('Button clicked');
    };

    const sendProfileToApi = async (profile: any) => {
        try {
            const response = await fetch('https://your-api-endpoint.com/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });

            if (!response.ok) {
                throw new Error('Failed to send profile data');
            }
        } catch (error) {
            console.error('Error sending profile data:', error);
        }
    };

    const getProfile = () => {
        liff.getProfile()
            .then((pf) => {
                console.log('pf => ', pf);
                const profileData = {
                    displayName: pf.displayName || '', // Handle possible undefined values
                    statusMessage: pf.statusMessage || '', // Handle possible undefined values
                    pictureUrl: pf.pictureUrl || '', // Handle possible undefined values
                    userId: pf.userId || '', // Handle possible undefined values
                };
                setDisplayName(profileData.displayName);
                setStatusMessage(profileData.statusMessage);
                setPictureUrl(profileData.pictureUrl);
                setUserId(profileData.userId);

                setUsername(profileData.displayName); // Pass the displayName to App component

                // Send profile data to the API
                sendProfileToApi(profileData);
            })
            .catch((err) => {
                console.error('Error getting profile:', err);
            });
    };

    const logout = () => {
        liff.logout()
        setIsLogin(false);
        window.location.reload()
    }

    const login = () => {
        liff.init({
            liffId,
            withLoginOnExternalBrowser: true,
        })
            .then(() => {
                setIsLogin(true);
                getProfile();
            })
            .catch((err) => {
                console.error('Error during login:', err);
            });
    };

    useEffect(() => {
        if (isLogin) {
            getProfile();
        }
    }, [isLogin]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleButtonClick}
                        component={Link} to="/setting"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            RANDOM MENU
                        </Link>
                    </Typography>
                    {isLogin && (
                        <>
                            <Avatar src={pictureUrl} alt="Profile" sx={{ marginRight: 2 }} />
                            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div>{displayName}</div>
                            </Link>
                            <Button color="inherit" onClick={logout}>Logout</Button>
                        </>
                    )}
                    {!isLogin && (
                        <Button color="inherit" onClick={login}>Login</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
