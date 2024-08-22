import { useState } from "react";
import Drawer from '@mui/material/Drawer';
import Data from "./data.json";

export const Dashboard = () => {
    const [data , setData ] = useState(Data.data);
    const [widgetName, setWidgetName] = useState("")
    const [itemId, setItemId] = useState("C1")
    const [status, setStatus] = useState({ right: false });
    const toggleDrawer = (open) => () => {
      setStatus({ right: open });
    };

    const handleWidget = (e) => {
      e.preventDefault()

      const newData = data.find((item) => item.categoryId === itemId);
      const object = {
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
    }

    const handleDelete = (itemId,Wid) => {
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
            {/* <button onClick={ toggleDrawer(true)} >Apply Filter</button> */}
      <Drawer
            anchor={"right"}
            open={status["right"]}
            onClose={toggleDrawer(false)}
          >

        <div className="drawer-headline">
        <p> Add Widget </p> <p style={{cursor: "pointer"}} onClick={toggleDrawer(false)} > X </p>
        </div>

         <div className="categories">
         {
            data.map((item) => 
                <div key={item.categoryId} onClick={() => setItemId(item.categoryId)} >
                  <p style={{cursor: "pointer"}}> {item.categoryName} </p> 
                </div>  )
         } </div>

         {  data.filter((item) => item.categoryId === itemId ).map((item) => 
            <div >
                { item.widgets.map(({name, image}) => 
                    <div className="widgets" > 
                        <input type="checkbox" /> 
                    {name}
                    </div>
                    )}
            </div>
          ) }

            <form onSubmit={(e) => { handleWidget(e) }} >
            <input className="widget-input" type="text" name="name" onChange={(e) => setWidgetName(e.target.value)} placeholder="Type Widget Name" autoComplete="off" />
            <button type="submit"> Add Widget </button>
            </form>

          <button className="cnf-btn" onClick={toggleDrawer(false)} > Confirm </button>
          </Drawer>
    
        {
          data.map((item) => 
          <div className="dashboard-widgets" key={item.categoryId} >
            <h3> {item.categoryName} </h3>
           
            <div className="widget-cards" > 
            {
                item.widgets.map(({wId, name, image}) => 
                <div className="widget-card" > {name} <button onClick={() => handleDelete(item.categoryId,wId) } >Remove</button> </div>
                )
            }
           <button className="widget-btn" onClick={ toggleDrawer(true)} >+ Add Widget</button>
           </div>
          </div>
        )
        }
        {
            data.map((item) => 
                <div>  
                {item.widgets.map((Element) => <li> {Element.name} </li> )}
                </div>
            )
        }
         
        </div>
    )
}