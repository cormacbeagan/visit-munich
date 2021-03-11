import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { createEntry } from '../store/actions/entryActions.js';

export default function useCreateEntry(initial = {}) {
  const [formData, setFormData] = useState(initial);
  const history = useHistory();
  const auth = useSelector(state => state.firebase.auth);
  const dispatch = useDispatch();

  // Credits Wes Bos' Advanced React Course
  const initialValues = Object.values(initial).join('');
  useEffect(() => {
    setFormData(initial);
  }, [initialValues]);
  // -------

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const checkCoords = (lat, lng) => {
    const valLat = parseFloat(lat);
    const valLng = parseFloat(lng);
    if (
      !isNaN(valLat) &&
      valLat <= 90 &&
      valLat >= -90 &&
      !isNaN(valLng) &&
      valLng <= 180 &&
      valLng >= -180
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleCoords = coords => {
    setFormData(prev => ({
      ...prev,
      lat: coords.lat.toString(),
      lng: coords.lng.toString(),
    }));
  };

  const handleSubmit = () => {
    if (formData.collection !== 'blogs') {
      const check = checkCoords(formData.lat, formData.lng);
      if (check) {
        dispatch(createEntry(formData, formData.collection));
        history.push(`/profile/${auth.uid}`);
      } else {
        alert('Invalid Geolocation');
        return;
      }
    } else {
      dispatch(createEntry(formData, formData.collection));
      setFormData(initial);
      history.push(`/profile/${auth.uid}`);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleCoords,
  };
}
