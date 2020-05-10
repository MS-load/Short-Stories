import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Navbar from './Navbar'

const Main = ({ children }) => (
    <div>
        <Navbar />
        <Grid container justify="center">
            <Grid item style={{ marginTop: 30 }}>
                {children}
            </Grid>
        </Grid>
    </div>
)

export default Main