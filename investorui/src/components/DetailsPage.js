import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ButtonGroup, Box, Typography } from '@mui/material';

const DetailsPage = () => {
    const { name } = useParams();
    const [investorDetails, setInvestorDetails] = useState(null);
    const [details, setDetails] = useState([]);
    const [filteredDetails, setFilteredDetails] = useState([]);
    const [distinctAsset, setDistinctAssets] = useState([]);
    const [selectedAsset, setselectedAsset] = useState('All');

    // Fetch data from API based on the name parameter
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/investors/${encodeURIComponent(name)}`)
            .then((response) => {
                setInvestorDetails(response.data);
                setDetails(response.data);
                setFilteredDetails(response.data);
                const assetclass = ['All', ...new Set(response.data.map(item => item.AssetClass))];
                setDistinctAssets(assetclass);
            })
            .catch((error) => console.error('Error fetching details:', error));
    }, [name]);

    const handleDateFilterChange = (AssetClass) => {
        setselectedAsset(AssetClass);
        if (AssetClass === 'All') {
            setFilteredDetails(details);
        } else {
            setFilteredDetails(details.filter(item => item.AssetClass === AssetClass));
        }
    };

    if (!investorDetails) {
        return <div>Loading details...</div>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                border: '2px solid',
                borderColor: 'primary.main',
                padding: 2,
                borderRadius: 2,
                maxWidth: 1000,
                margin: 'auto',

                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '10vh',
                padding: 2,
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: 2 }} >
                Commitments
            </Typography>

            <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{
                marginBottom: 2,
                '& .MuiButtonGroup-grouped': {
                    minWidth: '100px',
                    borderRight: '1px solid rgba(0, 0, 0, 0.23)',
                },
                '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                    marginRight: '8px',
                },
                '& .MuiButtonGroup-grouped:last-of-type': {
                    borderRight: 'none',
                }
            }}>
                {distinctAsset.map((AssetClass, index) => (
                    <Button
                        key={index}
                        onClick={() => handleDateFilterChange(AssetClass)}
                        variant={selectedAsset === AssetClass ? 'contained' : 'outlined'}

                    >
                        {AssetClass}
                    </Button>
                ))}
            </ButtonGroup>

            <TableContainer component={Paper} style={{ width: 800 }} align='center'>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Asset Class</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Currency</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Amount (In Millions)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDetails.map((details, index) => (
                            <TableRow key={index}>
                                <TableCell>{details.AssetClass}</TableCell>
                                <TableCell>{details.Currency}</TableCell>
                                <TableCell>{(details.Amount/1000000).toFixed(2)}M</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default DetailsPage;
