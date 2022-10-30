const validateUser = (userName: string, mail: string, data: any[]) => {
    if(!userName || !mail) {
        console.log('first if')
        return { isValid: false };
    }

    const result = data.filter(row => {
        return (row.name === userName && row.email === mail)
    });

    if (result.length > 0) {
        return {
            isValid: true,
            user: result[0]
        }
    }

    return {
        isValid: false,
        user: [{}]
    }
}

const validateReg = (name: string, mail: string, data: any[]) => {
    if(!name || !mail) {
        return false;
    }

    const result = data.filter(row => {
        return (row.name === name && row.email === mail)
    });

    return result.length === 0;
}

export { validateUser, validateReg }