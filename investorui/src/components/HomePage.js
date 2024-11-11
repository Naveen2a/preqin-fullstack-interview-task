import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Box,Typography } from '@mui/material';


const HomePage = () => {
  const [investors, setInvestors] = useState([]);
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/investors')
      .then((response) => setInvestors(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle row click, navigate to details page using the name as key
  const handleRowClick = (name) => {
    navigate(`/api/investors/${encodeURIComponent(name)}`);
  };

  return (        
        
        
        <Box 
      sx={{
        display: 'flex',
        border: '2px solid', 
        borderColor: 'primary.main', 
        padding: 2,
        borderRadius: 2, 
        maxWidth: 900, 
        margin: 'auto', 
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '10vh', 
        padding: 2, 
      }}
    >
        <Typography variant="h4" sx={{ marginBottom: 2}} >
        Investor Details
      </Typography>
    <TableContainer component={Paper} style={{ width: 800 }} align='center'>
      <Table  > 
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Name</TableCell>
            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Type</TableCell>
            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Date Added</TableCell>
            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Country</TableCell>
            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Amount(In Billions)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {investors.map((investor) => (
            <TableRow
              key={investor.Name}
              hover
              style={{ cursor: 'pointer' }}
              onClick={() => handleRowClick(investor.Name)}
            >
              <TableCell>{investor.Name}</TableCell>
              <TableCell>{investor.Type}</TableCell>
              <TableCell>{investor.DateAdded}</TableCell>
              <TableCell>{investor.Country}</TableCell>
              <TableCell>{(investor.Amount/1000000000).toFixed(2)}B</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    
  );
};

export default HomePage;
