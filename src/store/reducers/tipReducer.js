const initState = {
    tips: [
        {
            id: 1,
            name: 'The Test Tip',
            subtitle: 'Testing',
            textInput: 'Text here please ',
            link: null,
            linkText: null,
            lat: 48.122847,
            lng: 11.554482,
            image: 'images/Easy-schlachthof.jpg',
        }
      ]
}

const tipReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TIP':
            console.log('created', action.tip);
            return state;
        case 'CREATE_TIP_ERROR':
            console.log('create tip error', action.err)
            return state;
        case 'UPLOAD_SUCCESS':
            console.log('Upload successful')
            return state;
        case 'UPLOAD_ERROR':
            console.log('Upload error ', action.err)
            return state;
        case 'IMAGE_ARRAY_REMOVE_SUCCESS':
            console.log('Image removed from array')
            return state;
        case 'IMAGE_ARRAY_REMOVE_ERROR':
            console.log('Image array removal error', action.err)
            return state;
        case 'IMAGE_STORAGE_DELETE_SUCCESS':
            console.log('Image removed from storage')
            return state;
        case 'IMAGE_STORAGE_DELETE_ERROR':
            console.log('Image storage delete error', action.err)
            return state;
        case 'TIP_DELETE_SUCCESS':
            console.log('TIP delete success')
            return state;
        case 'TIP_DELETE_ERROR':
            console.log('TIP delete error', action.err)
            return state;
        case 'TIP_UPDATE_SUCCESS':
            console.log('Tip updated')
            return state;
        case 'TIP_UPDATE_ERROR':
            console.log('Tipupdate error', action.err)
            return state;
        default: 
            return state;
    }
}

export default tipReducer;