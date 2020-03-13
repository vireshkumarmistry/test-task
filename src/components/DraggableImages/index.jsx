import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import './draggableImageStyle.css';

export default function DraggableImages(props) {
  // maintain dragging image index
  let {current: draggingIndex} = useRef(null);

  // Store images array to local state to allow image swapping without modifying original images array
  let [images, setImages] = useState(props.images);

  useEffect(() => {
    setImages(props.images);
  }, [props.images]);

  function onDrop(event, index) {
    if (draggingIndex && draggingIndex !== index) {
      // Swap image: ${draggingIndex} with image: ${index}
      swapImages(draggingIndex, index);
    }
    draggingIndex = null;
  }

  function onDragStart(event, index) {
    draggingIndex = index;
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  function swapImages(index1, index2) {
    let a = images[index1];
    images[index1] = images[index2];
    images[index2] = a;
    setImages([...images]);
  }

  function renderImages() {
    return images.map((image, index) => {
      return (
        <div
          key={image + index}
          draggable
          onDragStart={e => onDragStart(e, index)}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, index)}
        >
          <img src={image} alt={image}/>
        </div>
      );
    });
  }

  return (
    <div className="responsiveImageContainer">
      {renderImages()}
    </div>
  )
}

DraggableImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

DraggableImages.defaultProps = {
  images: [],
};
