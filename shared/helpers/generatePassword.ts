export const generatePassword = () => {
    const alpha: string = "abcdefghijklmnopqrstuvwxyz";
    const special_character: string = "!@#$%^&*()_+-=}]{[?><";
    const random_number: string = `${Math.random()}`;

    let random_password: string = "";
    let random_special_character: string = "";
    for (let i of random_number.substring(random_number.length - 8)) {
        const converted_number: number = parseInt(i);
        if (converted_number <= special_character.length)
            random_special_character += special_character[converted_number];
        if (random_password.length <= 2)
            random_password += alpha[converted_number];
        else if (random_password.length > 2 && random_password.length <= 4)
            random_password += alpha[converted_number].toUpperCase();
    }

    return `${random_password}${
        random_special_character[0]
    }${random_password.charCodeAt(0)}${
        random_special_character[random_special_character.length - 1]
    }${random_password.toUpperCase().charCodeAt(random_password.length - 1)}`;
};
