const initState = {
  projects: [
    {
      id: 1,
      name: 'The Schlachthof',
      lat: 48.122847,
      lng: 11.554482,
      image: 'images/Easy-schlachthof.jpg',
      images: ['images/Easy-schlachthof.jpg'],
    },
  ],
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      console.log('created', action.project);
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error', action.err);
      return state;
    case 'UPLOAD_SUCCESS':
      console.log('Upload successful');
      return state;
    case 'UPLOAD_ERROR':
      console.log('Upload error ', action.err);
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
    case 'PROJECT_DELETE_SUCCESS':
      console.log('Project delete success');
      return state;
    case 'PROJECT_DELETE_ERROR':
      console.log('Project delete error', action.err);
      return state;
    case 'PROJECT_UPDATE_SUCCESS':
      console.log('Project updated');
      return state;
    case 'PROJECT_UPDATE_ERROR':
      console.log('Project update error', action.err);
      return state;
    default:
      return state;
  }
};

export default projectReducer;
