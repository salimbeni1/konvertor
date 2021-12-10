import React , {useMemo} from 'react'
import {useDropzone} from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'rgba(100, 100, 100, 1)',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(250, 250, 250 , 0.3)',
    color: 'rgba(100, 100, 100, 0.8)',
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
          {accept: 'image/*, .exr',
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
        <section style={{paddingBottom:'20px'}}>
          <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p>Drag & drop some images here, or click to select files</p>
          </div>
        </section>
    );
}


export default DropZone