const onChangeInput = (
    evt: (React.FormEvent<HTMLInputElement> | (React.FormEvent<HTMLTextAreaElement>)
), field: string, onCreatePost: Function) => {
    
    const newValue = evt.currentTarget.value;
    evt.currentTarget.classList.remove('--error');

    onCreatePost((currentValue: any) => ({
        ...currentValue,
        [field]: newValue
    }));
};

export default onChangeInput;