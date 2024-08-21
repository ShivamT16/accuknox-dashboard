import { useState } from "react";
import Data from "./data.json";

export const Dashboard = () => {
    const [data , setData ] = useState(Data.data);

    const handleWidget = (id) => {
      const newData = data.find((item) => item.categoryId === id);
      const object = {
        "name":"Cloud Accountsss",
        "image": ""
    }
      console.log([...newData.widgets, object])
    //   console.log( [...data, {...newData.widgets: object} ] )
      console.log(data.map((item)))


    }

    return(
        <div>
            <h2> CNAPP Dashboard </h2>

        {
          data.map((item) => 
          <div key={item.categoryId} >
            <h3> {item.categoryName} </h3>
           
            <div style={{border: "1px solid blue"}} > 
            {
                item.widgets.map(({name, image}) => 
                <p> {name} </p>
                )
            }
           <button onClick={ () => handleWidget(item.categoryId)} >Add Widget</button>
           </div>

          </div>
        )
        }
         
        </div>
    )
}