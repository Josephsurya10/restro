import React,{useState,useEffect} from 'react';
import Restrotable from "./Restrotable";
import { Button } from "@mui/material";
import "./App.css"
import AddPopup from './AddPopup';
const Home=()=> {
  const [visible, setvisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedTableData,setSelectedTableData]= useState({});
  const[idx,setIdx]=useState();

  useEffect(() => {
    const data = localStorage.getItem('restaurants');
    if (data) {
      setTableData(JSON.parse(data));
      console.log({data});
    }
  }, [setSelectedTableData]);

  const togglePop= ()=> {
    setSelectedTableData(null);
      setvisible(!visible);
  };

  const onSave = (tableList)=>{
    setTableData(tableList);
  }
  return (
      
      <div>
        <div>
        <h1 className="headinglogo">RESTAURANTS</h1>
        </div>
          <div className='addbutton ' >
          <Button variant="contained" color="success" style={{float:"right"}}>Print</Button>
          <Button variant="contained" onClick={togglePop} style={{float:"right"}}>Add Restaurant</Button>

          </div>
          <br/>
          <br/>
          <Restrotable tableData={tableData} selectedTableData={selectedTableData} setIdx={setIdx} onSave={onSave} setSelectedTableData={setSelectedTableData} toggle={togglePop} />
          {visible ? <AddPopup onSave={onSave} toggle={togglePop} /> : null}
      </div>
  )
}

export default Home;
