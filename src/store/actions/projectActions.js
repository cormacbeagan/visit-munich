import imageCompression from 'browser-image-compression';

export const createProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore()
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date(),
            images: [project.image]
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', project});
        }).catch((err) => {
            dispatch({type: 'CREATE_PROJECT_ERROR', err})
        })
    }
}

// implement a check to see if new walls are close to existing walls
// or find out how to merge points into one point on the map

export const uploadImage = (image, id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const storage = firebase.storage();
        const project = firestore.collection('projects').doc(id);
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        const options = {
            maxSizeMB: 3,
            maxWidthOrHeight: 2000,
            useWebWorker: true,
        }
        imageCompression(image, options).then(compImg => {
            uploadTask.on(
                'state_changed',
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    storage
                    .ref('images')
                    .child(compImg.name)
                    .getDownloadURL()
                    .then(url => {
                        project.update({
                            images: firebase.firestore.FieldValue.arrayUnion(url)
                        })
                    }).then(() => {
                        dispatch({type: 'UPLOAD_SUCCESS'})
                    }).catch(err => {
                        dispatch({type: 'UPLOAD_ERROR', err})
                    })
                })
            }
        )
    }
}

export const updateProject = (wall, id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;
        const projectToEdit = firestore.collection('projects').doc(id)
        projectToEdit.set({
            ...wall,
            updatedAt: new Date(),
            updatedBy: authId,
        }, {merge: true})
        .then(resp => {
            console.log(resp)
        })
    }
}

//next up alter wall details 
// and delete photos 
// delete whole walls 
