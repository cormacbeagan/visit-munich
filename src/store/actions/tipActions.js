
export const createTip = (tip) => {
    return (dispatch, getState, { getFirestore}) => {
        const firestore = getFirestore()
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('tips').add({
            ...tip,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date(),
            images: [tip.image]
        }).then(() => {
            dispatch({ type: 'CREATE_TIP', tip});
        }).catch((err) => {
            dispatch({type: 'CREATE_TIP_ERROR', err})
        })
    }
}

export const uploadTipImage = (image, id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const storage = firebase.storage();
        const project = firestore.collection('tips').doc(id);
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            snapshot => {},
            error => {
                console.log('Error: ', error);
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

export const updateTip = (tip, id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;
        const projectToEdit = firestore.collection('tips').doc(id)
        projectToEdit.set({
            ...tip,
            updatedAt: new Date(),
            updatedBy: authId,
        }, {merge: true})
        .then(() => {
            dispatch({type: 'PROJECT_UPDATE_SUCCESS'})
        }).catch(err => {
            dispatch({type: 'PROJECT_UPDATE_ERROR', err})
        })
    }
}

export const deleteTipImage = (img, id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const storage = firebase.storage();
        const projectToEdit = firestore.collection('tips').doc(id);
        projectToEdit.update({
            images: firebase.firestore.FieldValue.arrayRemove(img)
        }).then(() => {
            dispatch({type: 'IMAGE_ARRAY_REMOVE_SUCCESS'})
            if(img === '/images/Easy-schlachthof.jpg') return
            const imgStorageRef = storage.refFromURL(img);
            imgStorageRef.delete().then(() => {
                dispatch({type: 'IMAGE_STORAGE_DELETE_SUCCESS'})
            }).catch(err => {
                dispatch({type: 'IMAGE_STORAGE_DELETE_ERROR', err})
            })
        }).catch(err => {
            dispatch({type: 'IMAGE_ARRAY_REMOVE_ERROR', err})
        })
    }
}

export const deleteTip = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('tips').doc(id).delete()
        .then(() => {
            dispatch({type: 'PROJECT_DELETE_SUCCESS'})
        }).catch(err => {
            dispatch({type: 'PROJECT_DELETE_ERROR', err})
        })
    }
}
