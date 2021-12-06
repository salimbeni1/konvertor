import React , {useMemo} from 'react'
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(250, 250, 250 , 0.3)',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
const activeStyle = {
    borderColor: '#2196f3'
  };
  
const acceptStyle = {
    borderColor: '#00e676'
  };
  
const rejectStyle = {
    borderColor: '#ff1744'
  };


const DropZone = ({onFileUpload}) => {

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
      } = useDropzone(
          {accept: 'image/*',
           onDropAccepted: f => {onFileUpload(f)}}
          ); 
    

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));
    

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);
    
    
    return (
        <section className="container" style={{padding: "30px"}}>
          <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>Drag & drop some images here, or click to select files</p>
          </div>
          


        </section>
    );
}


export default DropZone