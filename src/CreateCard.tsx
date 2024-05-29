import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function ProductCreate() {
    const [ppic, setPpic] = useState('');
    const [pname, setPname] = useState('');
    const [ptag, setPtag] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [open, setOpen] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "pic": ppic,
            "name": pname,
            "tag": ptag,
            "desc": pdesc,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        fetch("http://localhost:3000/profiles", requestOptions)
            .then((response) => response.json())
            .then(() => {
                setOpen(true); // Open the modal
            })
            .catch((error) => console.error(error));
    }

    const handleClose = () => {
        setOpen(false);
        window.location.href = "/";
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Create Card
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField id="ppic" label="PIC URL" variant="outlined" fullWidth required
                                onChange={(e) => setPpic(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="pname" label="Name" variant="outlined" fullWidth required
                                onChange={(e) => setPname(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="ptag" label="Tag" variant="outlined" fullWidth required
                                onChange={(e) => setPtag(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="pdesc" label="Desc" variant="outlined" fullWidth required
                                onChange={(e) => setPdesc(e.target.value)} />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth>
                                Create
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
                            Create card successfully.
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
