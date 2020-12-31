const initState = {
    projects: [
        {
            id: 1,
            name: 'The Schlachthof',
            lat: 48.122847,
            lng: 11.554482,
            image: 'images/schlachthof4-hp.jpg', // needs to be an array
        },
        {
            id: 2,
            name: 'Brudermühl Bridge',
            lat: 48.112684,
            lng: 11.560598,
            image: 'images/Eagle Grafiti 1024px.jpg',
        },
        {
            id: 3,
            name: 'Ludwigsbrücke',
            lat: 48.131438,
            lng: 11.587447,
            image: 'images/IMG_20180330_220107.jpg', 
        },
        {
            id: 4,
            name: 'Endzeit',
            lat: 48.097470,
            lng: 11.527639,
            image: 'images/endzeit-image.jpg'
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
        default: 
            return state;
    }
}

export default projectReducer;