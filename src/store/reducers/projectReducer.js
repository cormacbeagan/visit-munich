const initState = {
    projects: [
        {
            id: 1,
            name: 'The Schlachthof',
            lat: 48.122847,
            lng: 11.554482,
            image: 'images/Easy-schlachthof.jpg',
            images: ['images/Easy-schlachthof.jpg']
        }
      ]
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('created', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err)
            return state;
        case 'UPLOAD_SUCCESS':
            console.log('Upload successful')
            return state;
        case 'UPLOAD_ERROR':
            console.log('Upload error ', action.err)
            return state;
        default: 
            return state;
    }
}

export default projectReducer;