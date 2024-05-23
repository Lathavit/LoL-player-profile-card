import { CssBaseline, Typography } from '@mui/material';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const WheelComponent = () => {
    const [winner, setWinner] = useState<string | null>(null);
    const [rotating, setRotating] = useState<boolean>(false);
    const [segments, setSegments] = useState<string[]>([]);
    const [newSegment, setNewSegment] = useState<string>('');

    const addSegment = () => {
        if (newSegment.trim() !== '') {
            setSegments([...segments, newSegment.trim()]);
            setNewSegment('');
        }
    };

    const spinWheel = () => {
        if (!rotating) {
            setRotating(true);
            const spinInterval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * segments.length);
                setWinner(segments[randomIndex]);
            }, 100);
            setTimeout(() => {
                clearInterval(spinInterval);
                setRotating(false);
            }, 3000); // Stop spinning after 3 seconds
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <div style={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="bold" className="mb-4" gutterBottom sx={{ marginTop: (theme) => theme.spacing(2) }}>มาสุ่มอาหารกัน!</Typography>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey', mb: 2 }}>
                    {segments.map((segment, index) => (
                        <div key={index}>{segment}</div>
                    ))}
                    <div>
                        <TextField
                            label="เพิ่มเมนู"
                            value={newSegment}
                            onChange={(e) => setNewSegment(e.target.value)}
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: '8px' }}
                        />
                        <Button variant="contained" onClick={addSegment} disabled={rotating}>
                            เพิ่ม
                        </Button>
                    </div>
                </Box>
                <Button variant="contained" onClick={spinWheel} disabled={rotating}>สุ่มเลย!!</Button>
                {winner && <Typography variant="h5" fontWeight="bold" className="mt-4" sx={{ marginTop: (theme) => theme.spacing(2)}}>และเมนูของคุณก็คือ : {winner}</Typography>}
            </div>
        </React.Fragment>
    );
};

export default WheelComponent;
