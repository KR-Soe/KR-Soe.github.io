const goNext = (page: number, maxPage: number, pageHandler: Function, action: string) => {
    const selector = document.querySelector('#posts-carousel') as HTMLElement;
    selector.classList.add('transition-carousel');
    let destinyPage;

    if(action === 'index') {
        selector.style.transform = `translateX(0%)`;
        return pageHandler(0);
    }
    
    if(action === 'next') {
        if((page + 1) === maxPage) return;
        destinyPage = page + 1;
        const translate = destinyPage * 100;
        selector.style.transform = `translateX(-${translate}%)`;
        return pageHandler(destinyPage);
    }
    
    if (page === 0) return;
    destinyPage = page - 1;
    const translate = destinyPage * 100;
    selector.style.transform = `translateX(-${translate}%)`;
    return pageHandler(destinyPage);
}

export default goNext;