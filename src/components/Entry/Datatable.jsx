import React, { useState } from 'react';
import "./Datatable.css"
const DataTable = ({ data, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    let pageCount = Math.ceil(filteredData.length / itemsPerPage);
    pageCount= Math.ceil(filteredData.length / itemsPerPage)!=0 ? pageCount : 1; 
    const handleChangePage = (page) => {
        setCurrentPage(page);
        console.log(data)
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // reset current page when search term changes
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = filteredData.slice(startIndex, endIndex);

    return (
        <div className='container mt-1'>
            <input
                type="text"
                placeholder="Search..."
                className='searchbox'
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Total</th>
                        <th>City</th>
                        <th>Date</th>
                        <th>Work</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((item, index) => (
                        <tr key={index}>
                            <td>{startIndex + index + 1}</td>
                            <td>{item.Start}</td>
                            <td>{item.End}</td>
                            <td>{item.Total}</td>
                            <td>{item.City}</td>
                            <td>{item.Date}</td>
                            <td>{item.Work}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='pagination'>
                <button className="btn btn-primary" onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {pageCount}</span> 
                <button className="btn btn-primary" onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === pageCount}>Next</button>
            </div>
        </div>
    );
};

export default DataTable;
