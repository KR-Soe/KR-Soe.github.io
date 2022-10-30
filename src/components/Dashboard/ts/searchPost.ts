import goNext from "./transition";

const searchPost = (searchInfo: { title: string, body: string }, posts: any[], newPost: Function, clearInput: Function, onChangePage: Function, currentPage: number) => {
    const { title, body } = searchInfo;

    const result = title ? searchByTitle(title, posts, newPost) : searchByBody(body, posts, newPost);
    goNext(currentPage, result.length, onChangePage, 'index');
    return clearInput({ title: '', body: ''});
}

const searchByTitle = (title: string, data: any[], newPost: Function) => {
    const result = data ? data.filter(row => (
        row.title.toLocaleLowerCase() === title.toLocaleLowerCase()
    )) : data;

    newPost(result);

    return result;
}

const searchByBody = (body: string, data: any[], newPost: Function) => {
    const result = data ? data.filter(row => (
        row.body.includes(body)
    )) : data;

    newPost(result);

    return result
}

export default searchPost;