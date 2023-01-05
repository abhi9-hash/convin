import React from 'react'
import { CircularProgress } from '@material-ui/core';

function loadingBox() {
    return (
        <div style={{width:'100vw', height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center'}}>
           <CircularProgress/>  Loading... 
        </div>
    )
}

export default loadingBox