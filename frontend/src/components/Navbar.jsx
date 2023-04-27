import React from "react";
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined
} from "@mui/icons-material";
import Flexible from "./Flexible";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import { AppBar, IconButton, InputBase, Toolbar, useTheme } from "@mui/material";

const Navbar = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    return(
    <AppBar
        sx={{
            position: "static",
            background: "none",
            boxShadow: "none"
        }}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                {/*LEFT*/}
                <Flexible>
                    <IconButton onClick={() => console.log('open/close sidebar')}>
                        <MenuIcon/>
                    </IconButton>
                    <Flexible
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem" 
                    >
                        <InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                    </Flexible>
                </Flexible>
                <Flexible gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ?(
                            <DarkModeOutlined sx={{ fontSize: "25px"}}/>
                        ):(
                         <LightModeOutlined sx={{ fontSize: "25px"}}/>   
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: "25px"}}/> 
                    </IconButton>
                </Flexible>
            </Toolbar>
        </AppBar>
    ); 
};

export default Navbar;