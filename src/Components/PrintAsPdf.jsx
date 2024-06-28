import React, { useState, useEffect } from 'react';

function PrintAsPdf() {
    const [isBool, setIsBool] = useState(true);

    const exportToPDF = () => {
        setIsBool(false);
        setTimeout(() => {
            window.print();
            setIsBool(true);
        }, 0);
    };

    return (
        <div className='table-controls' style={{marginTop:'2px'}}>
            {isBool && <button onClick={exportToPDF}>PDF</button>}
        </div>
    );
}

export default PrintAsPdf;
