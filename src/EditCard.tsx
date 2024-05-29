import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function UserUpdate() {
    const { _id } = useParams();

    useEffect(() => {
        const requestOptions = {
            method: "GET",
        };

        fetch("http://localhost:3000/profiles/" + _id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // if (result['status'] === 'ok') {
                    setPpic(result['pic'])
                    setPname(result['name'])
                    setPtag(result['tag'])
                    setPdesc(result['desc'])
                    
                // }
            })
            .catch((error) => console.error(error));
    }, [_id])

    const handleSubnit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "_id": _id,
            "pic": ppic,
            "name": pname,
            "tag": ptag,
            "desc": pdesc,
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
        };

        fetch("http://localhost:3000/profiles/" + _id, requestOptions)
            .then((response) => response.json())
            .then(() => {
                setOpen(true);
            })
            .catch((error) => console.error(error));
    }

    const handleClose = () => {
        setOpen(false);
        window.location.href = "/";
    };

    const [ppic, setPpic] = useState('');
    const [pname, setPname] = useState('');
    const [ptag, setPtag] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Edit Card
                </Typography>
                <form onSubmit={handleSubnit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField id="ppic" label="PIC URL" variant="outlined" fullWidth required
                                onChange={(e) => setPpic(e.target.value)} value={ppic}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="pname" label="Product name" variant="outlined" fullWidth required
                                onChange={(e) => setPname(e.target.value)} value={pname} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="ptag" label="Tag" variant="outlined" fullWidth required
                                onChange={(e) => setPtag(e.target.value)} value={ptag} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="pdesc" label="Desc" variant="outlined" fullWidth required
                                onChange={(e) => setPdesc(e.target.value)} value={pdesc} />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Success</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit card successfully.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </React.Fragment>
    );
}
