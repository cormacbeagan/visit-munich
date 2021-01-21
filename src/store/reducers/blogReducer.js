const initState = {
    blogs: [
        {
            id: null,
            name: 'A Title',
            subtitle: ': a subtitle',
            text: 'bla bla bla',
            link: 'A site url', 
        }
      ]
}

const blogReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_BLOG':
            console.log('created', action.blog);
            return state;
        case 'CREATE_BLOG_ERROR':
            console.log('Create blog error', action.err)
            return state;
        case 'BLOG_DELETE_SUCCESS':
            console.log('Blog delete success')
            return state;
        case 'BLOG_DELETE_ERROR':
            console.log('Blog delete error', action.err)
            return state;
        case 'BLOG_UPDATE_SUCCESS':
            console.log('Blog updated')
            return state;
        case 'BLOG_UPDATE_ERROR':
            console.log('Blog update error', action.err)
            return state;
        default: 
            return state;
    }
}

export default blogReducer;