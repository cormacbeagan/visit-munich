import uniqid from 'uniqid';
const placeHolderImage = '/images/Easy-schlachthof.jpg';

export const createEntry = (entry, collection) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection(collection)
      .get()
      .then(snap => {
        return snap.size;
      })
      .then(size => {
        firestore
          .collection(collection)
          .add({
            ...entry,
            rank: size,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date(),
            images: [entry.image],
          })
          .then(() => {
            dispatch({ type: 'CREATE_ENTRY', entry });
          })
          .catch(err => {
            dispatch({ type: 'CREATE_ENTRY_ERROR', err });
          });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_BLOG_ERROR', err });
      });
  };
};

export const uploadImage = (image, id, collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const storage = firebase.storage();
    const project = firestore.collection(collection).doc(id);
    const imageUniqId = uniqid(image.name + '-', `-${collection}`);
    const uploadTask = storage.ref(`images/${imageUniqId}`).put(image);
    console.log(project);
    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {
        dispatch({ type: 'IMAGE_UPLOAD_ERROR', error });
      },
      () => {
        storage
          .ref('images')
          .child(imageUniqId)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            project.update({
              images: firebase.firestore.FieldValue.arrayUnion(url),
            });
          })
          .then(() => {
            dispatch({ type: 'IMAGE_UPLOAD_SUCCESS' });
          })
          .catch(error => {
            dispatch({ type: 'IMAGE_UPLOAD_ERROR', error });
          });
      }
    );
  };
};

export const updateEntry = (entry, id, collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authId = getState().firebase.auth.uid;
    const projectToEdit = firestore.collection(collection).doc(id);
    projectToEdit
      .set(
        {
          ...entry,
          updatedAt: new Date(),
          updatedBy: authId,
        },
        { merge: true }
      )
      .then(() => {
        dispatch({ type: 'ENTRY_UPDATE_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'ENTRY_UPDATE_ERROR', err });
      });
  };
};

export const deleteImage = (img, id, collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const storage = firebase.storage();
    const projectToEdit = firestore.collection(collection).doc(id);
    projectToEdit
      .update({
        images: firebase.firestore.FieldValue.arrayRemove(img),
      })
      .then(() => {
        dispatch({ type: 'IMAGE_ARRAY_REMOVE_SUCCESS' });
        if (img === placeHolderImage) return;
        const imgStorageRef = storage.refFromURL(img);
        imgStorageRef
          .delete()
          .then(() => {
            dispatch({ type: 'IMAGE_STORAGE_DELETE_SUCCESS' });
          })
          .catch(err => {
            dispatch({
              type: 'IMAGE_STORAGE_DELETE_ERROR',
              err,
            });
          });
      })
      .catch(err => {
        dispatch({ type: 'IMAGE_ARRAY_REMOVE_ERROR', err });
      });
  };
};

export const deleteEntry = (id, collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection(collection)
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: 'ENTRY_DELETE_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'ENTRY_DELETE_ERROR', err });
      });
  };
};

export const updateRanking = (ranking, id, collection) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection(collection)
      .doc(id)
      .update({
        rank: ranking,
      })
      .then(() => {
        dispatch({ type: 'RANKING_UPDATE_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'RANKING_UPDATE_ERROR', err });
      });
  };
};
