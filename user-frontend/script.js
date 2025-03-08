const API_URL = "http://localhost:3000"; 


async function createAccount() {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a username!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/create-account`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username })
        });

        const data = await response.json();
        document.getElementById("accountMessage").innerText = data.message;
        if (response.ok) loginSuccess(username, data.account.points);
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to create account.");
    }
}


async function getAccount() {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a username!");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/get-account?username=${username}`);
        const data = await response.json();

        if (response.ok) {
            loginSuccess(username, data.account.points);
            console.log(username);
            localStorage.setItem("username", username);
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to retrieve account.");
    }
}


function loginSuccess(username, points) {
    localStorage.setItem("username", username);
    localStorage.setItem("points", points);

    document.getElementById("userDisplay").innerText = username;
    document.getElementById("pointsDisplay").innerText = points;

    document.querySelector(".login-container").classList.add("hidden");
    document.querySelector(".dashboard").classList.remove("hidden");
}




function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("points");

    document.querySelector(".login-container").classList.remove("hidden");
    document.querySelector(".dashboard").classList.add("hidden");
}


window.onload = function() {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
        loginSuccess(storedUser, localStorage.getItem("points"));
    }
};
