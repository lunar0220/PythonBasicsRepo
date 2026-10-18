function getPermutations(str) {
    if (str.length === 1) {
        return [str];
    }
    let result = [];


    for (let i = 0; i < str.length; i++) {
        let currentChar = str[i];

        let remainingChars =
            str.slice(0, i) + str.slice(i + 1);

        let permutations = getPermutations(remainingChars);


        for (let permutation of permutations) {
            result.push(currentChar + permutation);
        }
    }

    return result;
}


let password = prompt("Введите строку:");

console.log(getPermutations(password));