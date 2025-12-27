import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField, Box, Typography } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (meetingCode.trim()) {
            await addToUserHistory(meetingCode);
            navigate(`/${meetingCode}`);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Nav Bar */}
            <nav className="navBar" style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                padding: "1rem 2rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)" 
            }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#1976d2" }}>
                        TALK BRIDGE
                    </Typography>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/history")}>
                        <IconButton color="primary">
                            <RestoreIcon />
                        </IconButton>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>History</Typography>
                    </div>

                    <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </nav>

            {/* Main Content Container */}
            <div className="meetContainer" style={{ 
                display: "flex", 
                flex: 1, 
                alignItems: "center", 
                justifyContent: "space-around", 
                padding: "2rem" 
            }}>
                <div className="leftPanel" style={{ maxWidth: "500px" }}>
                    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 4, lineHeight: 1.2 }}>
                        The shortest distance between two people.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: "15px", alignItems: "center" }}>
                        <TextField 
                            fullWidth
                            onChange={e => setMeetingCode(e.target.value)} 
                            label="Enter Meeting Code" 
                            variant="outlined" 
                        />
                        <Button 
                            onClick={handleJoinVideoCall} 
                            variant='contained' 
                            size="large"
                            sx={{ height: "56px", px: 4 }}
                        >
                            Join
                        </Button>
                    </Box>
                </div>

                <div className='rightPanel'>
                    <img 
                        src='/logo4.webp' 
                        alt="Talk Bridge Illustration" 
                        style={{ width: "100%", maxWidth: "600px", height: "auto" }} 
                    />
                </div>
            </div>
        </Box>
    );
}

export default withAuth(HomeComponent);