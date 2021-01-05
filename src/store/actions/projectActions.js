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

export const uploadImage = (image, id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const storage = firebase.storage();
        const project = firestore.collection('projects').doc(id);
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            'state_changed',
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref('images')
                .child(image.name)
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
            }
        )
    }
}