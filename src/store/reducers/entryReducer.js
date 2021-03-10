const initState = {
  tips: [
    {
      id: 1,
      name: 'Test',
      subtitle: 'Testing',
      textInput: 'Text here please ',
      link: null,
      linkText: null,
      lat: 48.122847,
      lng: 11.554482,
      image: 'images/Easy-schlachthof.jpg',
    },
  ],
};

const tipReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ENTRY':
      console.log('created', action.entry);
      return state;
    case 'CREATE_ENTRY_ERROR':
      console.log('create entry error', action.err);
      return state;
    case 'IMAGE_UPLOAD_SUCCESS':
      console.log('Upload successful');
      return state;
    case 'IMAGE_UPLOAD_ERROR':
      console.log('Upload error ', action.err);
      return state;
    case 'ENTRY_UPDATE_SUCCESS':
      console.log('Entry updated');
      return state;
    case 'ENTRY_UPDATE_ERROR':
      console.log('Entry update error', action.err);
      return state;
    case 'IMAGE_ARRAY_REMOVE_SUCCESS':
      console.log('Image removed from array');
      return state;
    case 'IMAGE_ARRAY_REMOVE_ERROR':
      console.log('Image array removal error', action.err);
      return state;
    case 'IMAGE_STORAGE_DELETE_SUCCESS':
      console.log('Image removed from storage');
      return state;
    case 'IMAGE_STORAGE_DELETE_ERROR':
      console.log('Image storage delete error', action.err);
      return state;
    case 'ENTRY_DELETE_SUCCESS':
      console.log('Entry delete success');
      return state;
    case 'ENTRY_DELETE_ERROR':
      console.log('Entry delete error', action.err);
      return state;
    default:
      return state;
  }
};

export default tipReducer;
