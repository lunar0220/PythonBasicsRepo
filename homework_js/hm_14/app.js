function check() {
    let a = Number(document.getElementById("a1").value);
    let b = Number(document.getElementById("b1").value);
    let result = Number(document.getElementById("result1").value);

    document.getElementById("result1").disabled = true;

    if (result === a + b) {
        alert("Верно!");
        document.getElementById("result1").style.color = "green";
    } else {
        alert("Неверно!");
        document.getElementById("result1").style.color = "red";
    }
}