import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const SwitchPage: React.FC = () => {
    const [vegetarian, setVegetarian] = React.useState(
        localStorage.getItem('vegetarian') === 'true'
    );
    const [islamic, setIslamic] = React.useState(
        localStorage.getItem('islamic') === 'true'
    );

    useEffect(() => {
        localStorage.setItem('vegetarian', vegetarian.toString());
    }, [vegetarian]);

    useEffect(() => {
        localStorage.setItem('islamic', islamic.toString());
    }, [islamic]);

    const handleVegetarianChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVegetarian(event.target.checked);
    };

    const handleIslamicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIslamic(event.target.checked);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: (theme) => theme.spacing(4),
                }}
            >
                <Typography variant="h4" gutterBottom>
                    ตั้งค่าความต้องการอาหาร
                </Typography>
                <Box sx={{ width: '100%', maxWidth: 500 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={vegetarian}
                                onChange={handleVegetarianChange}
                                name="vegetarian"
                                color="primary"
                            />
                        }
                        label="มังสวิรัติ"
                        labelPlacement="start"
                        sx={{ justifyContent: 'space-between', width: '100%', marginLeft: 0 }}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={islamic}
                                onChange={handleIslamicChange}
                                name="islamic"
                                color="primary"
                            />
                        }
                        label="อิสลาม"
                        labelPlacement="start"
                        sx={{ justifyContent: 'space-between', width: '100%', marginLeft: 0 }}
                    />
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default SwitchPage;
