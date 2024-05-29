import React from 'react';
import { CardData } from './types';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CardProps {
    data: CardData;
    onTagClick: (tag: string) => void; // Update props to accept tag string
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ data, onTagClick, onEdit, onDelete }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSent = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            "pic": data.image,
            "name": data.name,
            "tag": data.tag,
            "desc": data.description,
            "events": [
                {
                    "type": "flex",
                    "altText": "Flex Message",
                    "contents": {
                        "type": "bubble",
                        "hero": {
                            "type": "image",
                            "url": data.image,
                            "size": "full",
                            "aspectRatio": "20:13",
                            "aspectMode": "cover",
                            "action": {
                                "type": "uri",
                                "uri": "https://line.me/"
                            }
                        },
                        "body": {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": data.name,
                                    "weight": "bold",
                                    "size": "xl"
                                }
                            ]
                        },
                        "footer": {
                            "type": "box",
                            "layout": "vertical",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "button",
                                    "style": "link",
                                    "height": "sm",
                                    "action": {
                                        "type": "uri",
                                        "label": "YOUTUBE",
                                        "uri": "https://line.me/"
                                    }
                                },
                                {
                                    "type": "button",
                                    "style": "link",
                                    "height": "sm",
                                    "action": {
                                        "type": "uri",
                                        "label": "TWITCH",
                                        "uri": "https://line.me/"
                                    }
                                },
                                {
                                    "type": "button",
                                    "action": {
                                        "type": "uri",
                                        "label": "GO TO WEBSITE",
                                        "uri": "http://linecorp.com/"
                                    }
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [],
                                    "margin": "sm"
                                }
                            ],
                            "flex": 0
                        }
                    }
                }
            ]
        });
    
        console.log("Request Headers:", myHeaders);
        console.log("Request Body:", raw);
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
    
        fetch("http://localhost:3000/webhook", requestOptions)
            .then((response) => {
                console.log("Response Status:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                setOpen(true); // Open the modal
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div className="card-container">
            <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                <IconButton size="small" color="warning" onClick={() => onEdit(data.id)}>
                    <EditIcon />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => onDelete(data.id)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
            <img src={data.image} alt={data.name} className="card-image" />
            <div className="card-content">
                <h3 className="card-title">{data.name}</h3>
                <div className="card-tag">
                    {data.tag.split(' ').map((tag, index) => (
                        <span key={index} onClick={() => onTagClick(tag)} className="tag-item">
                            {tag}
                        </span>
                    ))}
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Description
                    </Button>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{data.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{data.description}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSent}>Sent</Button>
                    </DialogActions>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Card;
