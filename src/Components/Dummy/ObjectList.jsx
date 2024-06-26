import React, { useState } from 'react';
import './ObjectList.css';

const ObjectList = ({ arrayList, setSelectedSiteDetails, setIsBool }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredList = arrayList.filter(item =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="popup-overlay" onClick={() => setIsBool(false)}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                
<div style={{backgroundColor:'#124561',height:'25px',display:'flex',justifyContent:'start',alignItems:'center'}}>
<h3 style={{margin:'0px',color:'white',fontSize:'13px'}}>Select Site</h3>
    </div>         
           <div className="popup-header">  
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <ul className="popup-list">
                    {filteredList.map((item) => (
                        <li style={{fontSize:'13px'}}
                            key={item._id}
                            onClick={() => {
                                setSelectedSiteDetails(item);
                                setIsBool(false);
                            }}
                        >
                            {item.site}
                        </li>
                    ))}
                </ul>
                <div className="popup-footer">
                    <button onClick={() => setIsBool(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ObjectList;
