document.addEventListener('DOMContentLoaded', () => {

    var x = document.getElementById("button1");
    x.addEventListener("click", saySomething);

    var y = document.getElementById("button2");
    y.addEventListener("click", function() {
        sample_array(['Watermelon', 'Apple', 'Orange', 'Kiwi']);
    });

    var z = document.getElementById("button3");
    z.addEventListener("click", sortArray);

})

function sample_array(userArray) {
    let selectedElement = document.getElementById("target");
    selectedElement.innerText = "The sample array is " + userArray.join(", ") + ".";
}

function sortArray() {
    let selectedElement = document.getElementById("targettwo");
    var array1 = [];
    var catArray = ['City', 'Fruit', 'Object', 'Name'];
    catArray.forEach(element => {
        var userInput = prompt("Enter one " + element);
        array1.push(userInput);
    });
    selectedElement.innerText = "Original array: " + array1.join(", ") + "\n Sorted array: " + array1.sort().join(", ");
}

function saySomething() {
    alert("Hello! My name is Andrea and it is very nice to meet you. Thank you for visiting my page.");
}