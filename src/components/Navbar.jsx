import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                {/* Add Menu Icon on the left */}
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>

                {/* Website Title or Branding */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Animemangatoon Webtoons
                </Typography>

                {/* Nav Links (could be buttons for different sections) */}
                <Button color="inherit">Home</Button>
                <Button color="inherit">Vote</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
