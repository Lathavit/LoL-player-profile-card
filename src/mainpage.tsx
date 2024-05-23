import React from 'react';
import ImageCarousel from './ImageCarousel';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

interface MainPageProps {
    username: string;
}

const MainPage: React.FC<MainPageProps> = ({ username }) => {
    const handleButtonClick = () => {
        // Handle button click logic here
        // For now, let's just log a message
        console.log('Button clicked');
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <ImageCarousel />
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div className="font-mitr" style={{ textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        component="div"
                        sx={{ marginTop: (theme) => theme.spacing(2) }}
                        className="font-mitr"
                    >
                        สวัสดี {username}, ยินดีต้อนรับสู่ RANDOM MENU
                    </Typography>
                    <Typography variant="h6">
                        วันนี้กินอะไรดี คิดไม่ออกใช่หรือไม่ เราจะสุ่มให้คุณเอง!!!
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" color="primary" sx={{ mx: 1 }}
                            onClick={handleButtonClick}
                            component={Link} to="/nrandom">
                            สุ่มเมนูปกติ
                        </Button>
                        <Button variant="contained" color="secondary" sx={{ mx: 1 }}
                        onClick={handleButtonClick}
                        component={Link} to="/srandom">
                            สุ่มเมนูแบบเลือกเอง
                        </Button>
                    </Box>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default MainPage;
