import { useState } from "react";
import Data from "./data.json";

export const Navbar = () => {
    const [search, setSearch] = useState("")

    return(
        <div className="Navbar">

        <div className="navbar">
          <h3> Home {'>'} <span style={{color: "blue"}}> Dashboard V3 </span> </h3>
          <input className="searchBar" type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search Widgets... " />
        </div>
        
        { search &&
          <div className="search-list">
          {  Data.data.map((item) => 
                <div>  
                {item.widgets.filter(({name}) => name.includes(search)).map((Element) => <li> {Element.name} </li> )}
                </div>
            ) }

          </div>  
        } 

        </div>
    )
}