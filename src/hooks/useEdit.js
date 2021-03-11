import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useHistory, useParams } from 'react-router';
import {
  updateEntry,
  deleteImage,
  deleteEntry,
} from '../store/actions/entryActions';

export default function useEdit(collection) {
  useFirestoreConnect([collection]);
  let { id } = useParams();
  const auth = useSelector(state => state.firebase.auth);
  const entry = useSelector(state =>
    state.firestore.data[collection]
      ? state.firestore?.data[collection][id]
      : null
  );
  const [formData, setFormData] = useState(entry);
  const [isEditing, setIsEditing] = useState(false);
  const [editImage, setEditImage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(entry);
  }, [entry]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setEditImage(formData.image);
  };

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCoords = coords => {
    setFormData(prev => ({
      ...prev,
      lat: coords.lat.toString(),
      lng: coords.lng.toString(),
    }));
  };

  const handleReady = () => {
    const obj = {};

    for (let key in formData) {
      if (formData[key] === '') {
        obj[key] = entry[key];
      }
    }
    setFormData(prev => ({ ...prev, ...obj }));
    uploadUpdate({ ...formData, ...obj });
  };

  const handleEditThumbnail = url => {
    if (!isEditing) return;
    setEditImage(url);
    setFormData(prev => ({ ...prev, image: url }));
  };

  const uploadUpdate = obj => {
    dispatch(updateEntry(obj, id, collection));
    setIsEditing(!isEditing);
  };

  const handleImageDelete = url => {
    const doubelCheck = window.confirm(
      'Are you sure you want to delete the image?'
    );
    if (doubelCheck) {
      dispatch(deleteImage(url, id, collection));
    }
  };

  const handleCancel = () => {
    setFormData(entry);
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    if (collection !== 'blogs') {
      if (entry.images[0]) {
        alert('Delete images first.');
        return;
      }
    }
    const doubleCheck = window.confirm(
      'Do you really want to delete the whole document?'
    );
    if (doubleCheck) {
      dispatch(deleteEntry(id, collection));
      history.push(`/profile/${auth.uid}`);
    }
  };
  return {
    handleDelete,
    handleCancel,
    handleImageDelete,
    handleEditThumbnail,
    handleReady,
    handleCoords,
    handleChange,
    handleEdit,
    editImage,
    formData,
    isEditing,
    entry,
    id,
  };
}
