import React from 'react';

export default function ImageComponent(props) {
  return (
    <div>
      <img src={process.env.PUBLIC_URL + props.imagePath} alt={props.altText} />
    </div>
  );
}


