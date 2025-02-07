export const validateEmail = (email) => {
    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

    return regex.test(email);

}