import { useState } from "react";
import Drawer from '@mui/material/Drawer';
import Data from "./data.json";

export const Dashboard = () => {
    const [data , setData ] = useState(Data.data);            // state to manipulate json data
    const [widgetName, setWidgetName] = useState("")          // state to store new widget
    const [itemId, setItemId] = useState("C1")                // state to differentiate category
    const [status, setStatus] = useState({ right: false });   // state for side Modal

    const toggleDrawer = (open) => () => {                    //function to handle Modal operations
      setStatus({ right: open });
    };

    const handleWidget = (e) => {                             //function to add/handle new widget
      e.preventDefault()

      const newData = data.find((item) => item.categoryId === itemId);
      const object = {
        "wId": Number(new Date().getTime().toString()),
        "name": widgetName ? widgetName :"",
        "image": ""  }

      setData(data.map((item) => {
        if(item.categoryId === itemId) {
            return { ...item, widgets: [...newData.widgets, object] }
        }
        else{
            return { ...item }
        }
      } ))
      setWidgetName("")      
    }

    const handleDelete = (itemId,Wid) => {                        //function to delete/remove widget
        setData(data.map((item) => {
            if(item.categoryId === itemId) {
                return { ...item, widgets: item.widgets.filter(({wId}) => wId !== Wid) }
            }
            else{
                return { ...item }
            }
          }))
    }

    return(
        <div>
            <h2> CNAPP Dashboard </h2>

      <Drawer
            anchor={"right"}
            open={status["right"]}
            onClose={toggleDrawer(false)}  >

        <div className="drawer-headline">
        <p> Add Widget </p> <p style={{cursor: "pointer"}} onClick={toggleDrawer(false)} > X </p>
        </div>

         <div className="categories">
         {  data.map((item) => 
                <div key={item.categoryId} onClick={() => setItemId(item.categoryId)} >
                  <p style={{cursor: "pointer"}}> {item.categoryName} </p> 
                </div>  )} 
         </div>

         {  data.filter((item) => item.categoryId === itemId ).map((item) => 
            <div >
                { item.widgets.map(({name, image}) => 
                    <div className="widgets" > 
                        <input type="checkbox" />  {name}
                    </div>  )}
            </div>
         )}

        <form onSubmit={(e) => { handleWidget(e) }} >
        <input className="widget-input" type="text" value={widgetName} onChange={(e) => setWidgetName(e.target.value)} placeholder="Type Widget Name" autoComplete="off" />
        <button type="submit"> Add Widget </button>
        </form>

        <button className="cnf-btn" onClick={toggleDrawer(false)} > Confirm </button>
        </Drawer>
    
        { data.map((item) => 
          <div className="dashboard-widgets" key={item.categoryId} >
            <h3> {item.categoryName} </h3>
           
            <div className="widget-cards" > 
            { item.widgets.map(({wId, name, image}) => 
                <div className="widget-card" > {name} <button onClick={() => handleDelete(item.categoryId,wId) } >Remove</button>
                <img style={{height: "10rem",paddingLeft: "4rem"}} src={image} alt="ima" />
                 </div>
            ) }
           <button className="widget-btn" onClick={ toggleDrawer(true)} >+ Add Widget</button>
           </div>

          </div>
        ) }

        </div>
    )
}