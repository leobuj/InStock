import React, {useState} from "react";
import {Box, useMediaQuery} from"@mui/material";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import {useSelector} from "react-redux";



const Dashboard = () => {
    return(
        <Box width="100%" height="100%">
            <Box>
                <Navbar />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Dashboard;

