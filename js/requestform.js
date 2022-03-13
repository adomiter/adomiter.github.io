document.addEventListener('DOMContentLoaded', () => {

    var x = document.getElementById("submitbutton");
    x.addEventListener("click", saySomething);

    var y = document.getElementById("cancelbutton");
    y.addEventListener("click", saySomething2);



})

function saySomething() {
    var name = document.getElementById("InputName").value;
    var email = document.getElementById("InputEmail").value;
    var address = document.getElementById("InputAddress").value;

    alert(`Your request,  ${name}, has been sent successfully. A report for property at ${address} will be sent to ${email} shortly.`)
}

function saySomething2() {
    alert("Your request has been deleted successfully.")
}