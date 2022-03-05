import { Link } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const LinkPage = () => {

  const [history, setHistory] = useState([]);

  // const config = {
  //    headers: { Authorization:localStorage.getItem('SavedToken') }
  // };


  const config = {
    headers: {
        'auth-token' : localStorage.getItem('token'),
    }
  };
  useEffect(() => {
  
    let isMounted = true;
        const controller = new AbortController();

        const getHistory = async () => {
      
            const response = await axios.get(`http://localhost:8000/api/history`, config, {
                signal: controller.signal
            });

            console.log(response.data)
            isMounted && setHistory(response.data.transaction)
            console.log(response.data.transaction)
        }

        getHistory();

        return () => {
            isMounted = false;
            controller.abort();
        }


  
  }, []);

  console.log(history);

    return (
        // <section>
        //     <h3>Your Transaction History :)</h3>
        //     <br />
        //     <p>Your History Here, Still Under Development!</p>

        //     <br />

        //     <Link to="/">Home</Link>

        // </section>

        <div className='container'>
      <div className='wrapper'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align='right'>From</TableCell>
                <TableCell align='right'>To</TableCell>
                <TableCell align='right'>Value</TableCell>
                <TableCell align='right'>Currency</TableCell>
                <TableCell align='right'>Created At</TableCell>
                <TableCell align='right'>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                history.map((row, key) => (
                <TableRow
                  key={Math.random()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {key}
                  </TableCell>
                  <TableCell align='right'>{row.SenderUserName}</TableCell>
                  <TableCell align='right'>{row.ReceiverId}</TableCell>
                  <TableCell align='right'>{row.ConvertedAmount}</TableCell>
                  <TableCell align='right'>{row.ReceivingCurrency}</TableCell>
                  <TableCell align='right'>{row.createdDate}</TableCell>
                  <TableCell align='right'>{row.updatedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>

    );
}

export default LinkPage