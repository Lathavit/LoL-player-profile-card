// src/components/AddCard.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AddCard: React.FC = () => {
    const handleAddClick = () => {
        // Handle add card logic here
        console.log('Add card clicked');
    };

    return (
        <div className="add-card-container" onClick={handleAddClick}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Typography variant="h2" color="primary">+</Typography>
                <Typography variant="body1">ADD</Typography>
            </Box>
        </div>
    );
};

export default AddCard;
