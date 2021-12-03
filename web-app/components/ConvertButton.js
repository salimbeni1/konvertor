import React from 'react'

const ConvertButton = ( {title , onClickB} ) => {
    return (
        <div style={{padding:'30px'}}>

        <button onClick={onClickB}>
        {title}
        </button>

        </div>
    )
}


export default ConvertButton