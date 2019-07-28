const getIdFromUrl = (url: string) => {
    const str = url.split('/');
    return parseInt(str[str.length - 1])
};

export { getIdFromUrl };
