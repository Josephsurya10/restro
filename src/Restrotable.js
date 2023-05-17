import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React,{useEffect,useState} from "react";
import { Button } from '@mui/material';
import EditPopup from './EditPopup';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const Restrotable = (props) => {
    const {tableData,selectedTableData,setSelectedTableData,onSave}=props;
    const [restaurants, setRestaurants] = useState(tableData || []);
    const[idx,setIdx]=useState();
    const [enabled,setEnabled]=useState(false);
    
    const toggleEdit =()=>{
      setEnabled(!enabled);
    }
    useEffect(() => {
        setRestaurants(tableData);
        
    }, [tableData,setRestaurants]);
      
      
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Cuisine</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map((item,index) => (
            <StyledTableRow key={index} onClick={()=>{
              setIdx(index)
              setSelectedTableData(item)}}>
              <StyledTableCell component="th" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="center">{item.address}</StyledTableCell>
              <StyledTableCell align="center">{item.phone}</StyledTableCell>
              <StyledTableCell align="center">{item.cuisine}</StyledTableCell>
              <StyledTableCell align="center">{item.email}</StyledTableCell>
              <StyledTableCell align="center">
                <Button variant='contained'size='sm' onClick={toggleEdit} >Edit</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {enabled ? <EditPopup onSave ={onSave}toggleEdit={toggleEdit}selectedTableData={selectedTableData} index={idx}/>:null}

        </TableBody>
      </Table>
    </TableContainer>

    );
  };
  export default Restrotable;