document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", function() {
        const inputValue = document.getElementById("inputBox").value;
        const url = `/your-endpoint?input=${inputValue}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Display the response data in the result div
                document.getElementById("result").textContent = JSON.stringify(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});