import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
    Card, 
    Box, 
    CardActions, 
    CardContent, 
    Button, 
    Typography, 
    IconButton, 
    Grid, 
    Container 
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import VideoCallIcon from '@mui/icons-material/VideoCall';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [getHistoryOfUser]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <Box sx={{ 
            backgroundColor: '#f9fafb', 
            minHeight: '100vh', 
            pb: 5 
        }}>
            {/* Navigation Header */}
            <Box sx={{ 
                backgroundColor: 'white', 
                borderBottom: '1px solid #e5e7eb', 
                p: 2, 
                mb: 4,
                display: 'flex',
                alignItems: 'center'
            }}>
                <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton 
                        onClick={() => routeTo("/home")} 
                        sx={{ mr: 2, border: '1px solid #e5e7eb' }}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <HistoryIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="h5" fontWeight="700">Meeting History</Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg">
                {meetings.length === 0 && !loading ? (
                    /* --- EMPTY STATE --- */
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        mt: 8, 
                        textAlign: 'center' 
                    }}>
                        <Box 
                            sx={{ 
                                backgroundColor: '#f3f4f6', 
                                borderRadius: '50%', 
                                p: 3, 
                                mb: 2 
                            }}
                        >
                            <VideoCallIcon sx={{ fontSize: 60, color: '#9ca3af' }} />
                        </Box>
                        <Typography variant="h6" fontWeight="600" gutterBottom>
                            No previous history yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, mb: 3 }}>
                            Your past meetings will appear here once you've joined or hosted them.
                        </Typography>
                        <Button 
                            variant="outlined" 
                            onClick={() => routeTo("/home")}
                            sx={{ textTransform: 'none', borderRadius: 2 }}
                        >
                            Join a meeting now
                        </Button>
                    </Box>
                ) : (
                    /* --- DATA STATE --- */
                    <Grid container spacing={3}>
                        {meetings.map((e, i) => (
                            <Grid item xs={12} sm={6} md={4} key={i}>
                                <Card sx={{ 
                                    borderRadius: 3, 
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    transition: '0.3s ease', 
                                    '&:hover': { 
                                        transform: 'translateY(-4px)', 
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                                    } 
                                }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography color="primary" variant="overline" fontWeight="700" letterSpacing={1.1}>
                                            Past Meeting
                                        </Typography>
                                        <Typography variant="h6" sx={{ mt: 1, mb: 1, fontWeight: 'bold' }}>
                                            {e.meetingCode}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                            <Typography variant="body2">
                                                Joined on {formatDate(e.date)}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    
                                    <CardActions sx={{ p: 2, pt: 0 }}>
                                        <Button 
                                            fullWidth 
                                            variant="contained" 
                                            disableElevation
                                            onClick={() => routeTo(`/meeting/${e.meetingCode}`)}
                                            sx={{ 
                                                textTransform: 'none', 
                                                borderRadius: 2,
                                                fontWeight: '600',
                                                py: 1
                                            }}
                                        >
                                            Rejoin Meeting
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}