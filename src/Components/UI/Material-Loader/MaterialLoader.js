import React from 'react';
import './MaterialLoader.css';
import CircularProgress from '@material-ui/core/CircularProgress';


function MaterialLoader() {
  return (
    <div className="loaderContainer">
      <CircularProgress className="loader"/>
    </div>
  );
}
export default MaterialLoader;