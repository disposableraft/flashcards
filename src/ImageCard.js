import React from 'react';

function ImageCard(props) {
  const style = {
    background: `center / contain url(${props.image}?width=500)`,
  };

  return (
    <div
      style={style}
      className="imageCard ">
      {props.children}
    </div>
  );
}

export default ImageCard;