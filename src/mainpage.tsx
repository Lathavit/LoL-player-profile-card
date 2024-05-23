import React from 'react';
import ImageCarousel from './ImageCarousel';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

interface MainPageProps {
    username: string;
}

const MainPage: React.FC<MainPageProps> = ({ username }) => {
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
                </div>
            </Container>
        </React.Fragment>
    );
};

export default MainPage;
