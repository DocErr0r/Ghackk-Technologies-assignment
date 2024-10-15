import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WebtoonCard from './components/WebtoonCard';
import { Container, Button, Typography, Grid } from '@mui/material';

const App = () => {
    const [webtoons, setWebtoons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [results, setResults] = useState({ manhwa: 0, anime: 0 });
    const [voted, setVoted] = useState(false); // State to track if the user has voted

    useEffect(() => {
        // Fetch webtoons from the backend
        axios
            .get('http://localhost:5000/api/webtoons')
            .then((response) => {
                setWebtoons(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching webtoons:', err);
                setError('Failed to load webtoons.');
                setLoading(false);
            });

        // Fetch the current voting results
        fetchResults();
    }, []);

    // Fetch voting results
    const fetchResults = () => {
        axios
            .get('http://localhost:5000/api/results')
            .then((response) => {
                setResults(response.data);
            })
            .catch((err) => {
                console.error('Error fetching results:', err);
            });
    };

    // Submit a vote
    const submitVote = (voteType) => {
        axios
            .post('http://localhost:5000/api/vote', { voteType })
            .then(() => {
                fetchResults(); // Refresh the results after voting
                setVoted(true); // Set voted state to true
            })
            .catch((err) => {
                console.error('Error submitting vote:', err);
            });
    };

    if (loading) {
        return <p className="text-center my-10">Loading webtoons...</p>;
    }

    if (error) {
        return <p className="text-center my-10">{error}</p>;
    }

    return (
        <div>
            <Container className="my-10">
                <h1 className="text-4xl font-bold text-center mb-8">Top 5 Fantasy Webtoons</h1>
                <Grid container spacing={4}>
                    {webtoons.map((webtoon, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <WebtoonCard webtoon={webtoon} />
                        </Grid>
                    ))}
                </Grid>

                <div className="my-10 text-center">
                    <h2 className="text-2xl font-bold">Vote for your favorite version of Tower of God</h2>
                    <div className="mt-4">
                        <Button variant="contained" color="blue" onClick={() => submitVote('manhwa')} className={`mr-2 transition duration-300 ease-in-out transform ${voted ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={voted}>
                            Vote for Manhwa
                        </Button>
                        <Button variant="contained" color="purple" onClick={() => submitVote('anime')} className={`transition duration-300 ease-in-out transform ${voted ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={voted}>
                            Vote for Anime
                        </Button>
                    </div>

                    <Typography variant="h6" className="mt-4">
                        Current Results:
                    </Typography>
                    <Typography variant="body1">
                        Manhwa: <span className="font-bold">{results.manhwa}</span>
                    </Typography>
                    <Typography variant="body1">
                        Anime: <span className="font-bold">{results.anime}</span>
                    </Typography>

                    {voted && (
                        <Typography variant="body1" className="text-green-600 mt-4">
                            Thank you for voting!
                        </Typography>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default App;
