import React from 'react'
import { Button } from 'react-native';


const ConvertButton = ( {title , onClickB} ) => {
    return (
        <div style={{padding:'30px'}}>

        <Button
            title= {title}
            color= "#ff66d9"
            onPress= {() => onClickB()}
        />
        </div>
    )
}


export default ConvertButton
