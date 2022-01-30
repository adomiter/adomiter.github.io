/*
function changeTitle(){
    let selectedElement  = document.getElementById("")
    console.log(selectedElement)
    selectedElement.innerText = "DIGS"
}
*/



function minute() {
    var minute_num = new Date()
    minute_num = minute_num.getMinutes()
    let selectedElement = document.getElementById("display_time")
    selectedElement.innerText = minute_num
}

function add_element() {
    let selectedElement = document.getElementById("delete")
    selectedElement.style.display = 'block'
}


function delete_element() {
    let selectedElement = document.getElementById("delete")
    selectedElement.style.display = 'none'

}