import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../store/actions/entryActions';
import { FaFileImport } from 'react-icons/fa';
import Button from './button';
import styled from 'styled-components';

const compressOptions = {
  maxSizeMB: 1.5,
  maxWidthOrHeight: 2120,
  useWebWorker: true,
};

const UploadDiv = styled.div`
  margin-bottom: 20px;
  h4 {
    font-size: 18px;
    margin: 10px 0;
  }
  p {
    margin: 5px 10px;
    color: #d65f3d;
  }
`;

const FileDiv = styled.div`
  max-height: 75px;
  label {
    display: inline;
    margin: 0 20px;
    cursor: pointer;
    color: #616161;
  }
  input {
    display: none;
  }
`;

export default function ImageUpload(props) {
  const { id, collection } = props;
  const dispatch = useDispatch();
  const [imageName, setImageName] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const input = useRef();
  const handleImageUpload = async e => {
    e.preventDefault();
    const compImage = await imageCompression(imageFile, compressOptions);
    dispatch(uploadImage(compImage, id, collection));
    input.current.value = null;
    setImageName(null);
    setImageFile(null);
  };

  const handleImageFileSelect = e => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }
  };

  return (
    <UploadDiv>
      <h4>Upload Image: </h4>
      <form onSubmit={handleImageUpload}>
        <FileDiv>
          <div>
            <label htmlFor="file" tabIndex="0">
              <input
                ref={input}
                onChange={handleImageFileSelect}
                type="file"
                accept="image/*,.pdf"
                id="file"
              />
              {/* //todo needs a keydown listener */}
              <FaFileImport size={32} onClick={() => setImageName(null)} />
              <p className="accessibly-hidden">Upload an image</p>
            </label>
          </div>
          {imageFile && <p>{imageName}</p>}
        </FileDiv>
        <div>{imageFile && <Button children={'Upload Image'} />}</div>
      </form>
    </UploadDiv>
  );
}

ImageUpload.propTypes = {
  id: PropTypes.string.isRequired,
  uploadImage: PropTypes.func,
  uploadTipImage: PropTypes.func,
  usage: PropTypes.string,
};
