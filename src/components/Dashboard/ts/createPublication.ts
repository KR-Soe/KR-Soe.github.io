import goNext from "./transition";

const createPublication = (sendRequest: Function, postInfo: { title: string, body: string}, post: any[], currentPage: number, onChangePage: Function) => {
    const { title, body } = postInfo;
    const input = document.querySelector<HTMLElement>('.post-title-input');
    const area = document.querySelector<HTMLElement>('.textarea-field');

   if(!title || ! body) {
        input!.classList.add('--error');
        area!.classList.add('--error');

        return alert('complete los campos');
   };

   sendRequest();
   goNext(currentPage, post.length, onChangePage, 'index');
}

export default createPublication;