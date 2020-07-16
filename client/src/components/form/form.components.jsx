import axios from 'axios';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ReactJson from 'react-json-view'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function BasicTextFields() {
    const classes = useStyles();

    const [input, setInput] = useState()
    const [result, setResult] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let { data: { data } } = await axios.post(`api/calc`, { input })
            setResult(data)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleChange = async (e) => {
        setInput(e.target.value)
    }

    return (
        <Grid
            container
            spacing={10}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >

            <ReactJson src={result} />
            <br />
            <br />

            <Paper elevation={3} style={{
                width: 250,
                padding: 20
            }}>
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                    <TextField type='number' onChange={handleChange} value={input} name="input" id="outlined-basic" label="Input" variant="outlined" />
                    <Button type="submit" variant="outlined" color="primary">
                        calculate
            </Button>
                </form>
            </Paper>
        </Grid >
    );
}
