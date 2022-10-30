const bodyValidator = (body: string) => {
    return body.length <= 500;
}

export default bodyValidator;