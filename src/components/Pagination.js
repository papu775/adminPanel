import React, { useState } from 'react';

const Pagination = ({
    setPointer,
    pointer,
    handlePageClick,
    totalPages,
    pageIndex,
}) => {
    const [pageUnit, setPageUnit] = useState(1);
    const span = 3;
    // const [span, setSpan] = useState(3);

    // const nextPage = () => {
    //     // if (pageUnit + span == totalPages) return;
        
    //     setPointer(pointer + 1);

    //     const nextPointerValue = pointer + 1; //next updated state of pointer

    //     if (nextPointerValue + 1 > pageUnit + span) {
    //         setPageUnit(pageUnit + span);
    //     }
        
    //     handlePageClick({ pageIndex: nextPointerValue, isSetPointer: false });
    // }

    // const prevPage = () => {
    //     const nextPointerValue = pointer - 1;
    //     if (nextPointerValue < 1) return;

    //     setPointer(nextPointerValue);

    //     console.log('nextPointerValue', nextPointerValue);

    //     if (nextPointerValue < pageUnit) {
    //         setPageUnit(pageUnit - span);
    //     }
    //     // setPageUnit(pageUnit - span);
    //     handlePageClick({ pageIndex: nextPointerValue, isSetPointer: false });
    // }

    const nextPage = () => {
        if (pageUnit + span > totalPages) return; 
        setPageUnit(pageUnit + span);
        setPointer(pointer + span);
        handlePageClick({ pageIndex: pageUnit + span, isSetPointer: false })
    }
    
    const prevPage = () => {
        if (pageUnit - span < 1) return;
        if (pointer < 1) return;
        setPageUnit(pageUnit - span);
        setPointer(pointer - span);
        handlePageClick({ pageIndex: pageUnit - span, isSetPointer: false })
    }


    return (
        <>
            <div style={{ margin: '0 auto', marginTop: 10, width: 250, height: 30 }} className="text-blue">
                <div className='pagination-container'>
                    <div className='box pagination-arrow' onClick={() => prevPage()}>&larr;</div>
                    {
                        (pageUnit) > totalPages
                        ?
                        <div className='box blurred-page'>{pageUnit}</div> 
                        :
                        // <div className={pageUnit == pointer ? 'box selected-page' : 'box'} onClick={() => handlePageClick({ pageIndex: pageUnit, isSetPointer: true })}>{pageUnit}</div>
                        <div className={pageUnit === pointer ? 'box selected-page' : 'box'} onClick={() => handlePageClick({ pageIndex: pageUnit, isSetPointer: true })}>{pageUnit}</div>
                    }
                    {
                        (pageUnit + 1) > totalPages
                        ?
                        <div className='box blurred-page'>{pageUnit + 1}</div> 
                        :
                        <div className={pageUnit + 1 === pointer ? 'box selected-page' : 'box'} onClick={() => handlePageClick({ pageIndex: pageUnit + 1, isSetPointer: true })}>{pageUnit + 1}</div>
                    }
                    {
                        (pageUnit + 2) > totalPages
                        ?
                        <div className='box blurred-page'>{pageUnit + 2}</div> 
                        :
                        <div className={pageUnit + 2 === pointer ? 'box selected-page' : 'box'} onClick={() => handlePageClick({ pageIndex: pageUnit + 2, isSetPointer: true })}>{pageUnit + 2}</div>
                    }
                    <div className='box pagination-arrow' onClick={() => nextPage()}>&rarr;</div>
                </div>
            </div>
        </>
    )
}

export default Pagination;
