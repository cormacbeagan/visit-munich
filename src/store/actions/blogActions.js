export const createBlog = (blog) => {
    return (dispatch, getState, { getFirestore}) => {
        const firestore = getFirestore()
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('blogs').add({
            ...blog,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date(),
        }).then(() => {
            dispatch({ type: 'CREATE_BLOG', blog});
        }).catch((err) => {
            dispatch({type: 'CREATE_BLOG_ERROR', err})
        })
    }
}

export const updateBlog = (blog, id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const authId = getState().firebase.auth.uid;
        const projectToEdit = firestore.collection('blogs').doc(id)
        projectToEdit.set({
            ...blog,
            updatedAt: new Date(),
            updatedBy: authId,
        }, {merge: true})
        .then(() => {
            dispatch({type: 'BLOG_UPDATE_SUCCESS'})
        }).catch(err => {
            dispatch({type: 'BLOG_UPDATE_ERROR', err})
        })
    }
}

export const deleteBlog = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('blogs').doc(id).delete()
        .then(() => {
            dispatch({type: 'BLOG_DELETE_SUCCESS'})
        }).catch(err => {
            dispatch({type: 'BLOG_DELETE_ERROR', err})
        })
    }
}
