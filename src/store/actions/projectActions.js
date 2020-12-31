export const createProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        
        const firestore = getFirestore()
        firestore.collection('projects').add({
            ...project,
            author: 'Mac',
            authorId: '089',
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', project});
        }).catch((err) => {
            dispatch({type: 'CREATE_PROJECT_ERROR', err})
        })
    }
}