import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import './draggableImageStyle.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export default function DraggableImages(props) {
  // maintain dragging image index
  let [draggingIndex, setDraggingIndex] = useState(null);
  let [replaceIndex, setReplaceIndex] = useState(null);

  // Store images array to local state to allow image swapping without modifying original images array
  let [images, setImages] = useState(props.images);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setImages(props.images);
  }, [props.images]);

  function onDrop(event, index) {
    if ((draggingIndex || draggingIndex === 0) && draggingIndex !== index) {
      setReplaceIndex(index);
      setModal(true);
    }
  }

  function onDragStart(event, index) {
    setDraggingIndex(index);
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  // Swap image: ${draggingIndex} with image: ${index}
  function swapImages() {
    let temp = images[draggingIndex];
    images[draggingIndex] = images[replaceIndex];
    images[replaceIndex] = temp;
    setImages([...images]);
    toggle();
  }

  const toggle = useCallback(() => {
    setModal(!modal);
    setDraggingIndex(null);
    setReplaceIndex(null);
  }, [modal]);

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
    <React.Fragment>
      <div className="responsiveImageContainer">
        {renderImages()}
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Confirm</ModalHeader>
        <ModalBody>
          Do you want to replace Image {draggingIndex + 1} for Image {replaceIndex + 1}?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={swapImages}>Replace</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}

DraggableImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

DraggableImages.defaultProps = {
  images: [],
};
