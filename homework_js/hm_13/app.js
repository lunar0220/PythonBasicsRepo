const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", () => {
    const inputs = document.querySelectorAll("input");

    for (const input of inputs) {
        input.value = "";
    }
});