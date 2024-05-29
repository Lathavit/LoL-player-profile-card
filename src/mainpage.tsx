import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CardList from './Cardlist'; // Import CardList component
import { CardData } from './types'; // Import CardData type
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface MainPageProps {
    username: string;
}

interface Profile {
    _id: string;
    pic: string;
    name: string;
    tag: string;
    desc: string;
}


const MainPage: React.FC<MainPageProps> = ({  }) => {
    const [items, setItems] = useState<CardData[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        UserGet();
    }, []);

    const UserGet = async () => {
        try {
            const response = await fetch("http://localhost:3000/profiles");
            if (!response.ok) {
                throw new Error('Failed to fetch profiles');
            }
            const data: Profile[] = await response.json();
            const cardData: CardData[] = data.map(profile => ({
                id: profile._id, // Use string directly
                image: profile.pic,
                name: profile.name,
                tag: profile.tag,
                description: profile.desc
            }));
            setItems(cardData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTagClick = (tag: string) => {
        console.log('Tag clicked:', tag); // Log the clicked tag
        // You can add additional logic here if needed
    };
    

    const handleEdit = (id: string) => {
        console.log('Edit clicked for id:', id);
        window.location.href = '/edit/' + id;
    };

    const handleDelete = (id: string) => {
        console.log('Delete clicked for id:', id);
        setSelectedId(id);
        setOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedId) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "_id": selectedId
            });

            const requestOptions = {
                method: "DELETE",
                headers: myHeaders,
                body: raw,
            };

            try {
                const response = await fetch("http://localhost:3000/profiles/" + selectedId, requestOptions);
                const result = await response.json();
                alert(result);
                UserGet();
            } catch (error) {
                console.error(error);
            } finally {
                setOpen(false);
                setSelectedId(null);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedId(null);
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
                }}
            >
                <Box sx={{ width: '100%', mt: 4 }}>
                    <CardList cards={items} onTagClick={handleTagClick} onEdit={handleEdit} onDelete={handleDelete} />
                </Box>
            </Container>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={confirmDelete} color="primary">Delete</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default MainPage;
