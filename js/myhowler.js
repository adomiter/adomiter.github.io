document.addEventListener('DOMContentLoaded', () => {
    // Get animal titles from HTML, assign click for number of animals found.
    // The animal title determines which sprite is played.
    var x = document.getElementById("button1");
    x.addEventListener("click", () => {
        playSound("/media/tspt_busy_beach_ambience_loop_012.mp3");
    })

    var y = document.getElementById("button2");
    y.addEventListener("click", () => {
        playSound("/media/PM_Church_Bells_Distant_People_Walla_Dog_Wind_Old_Town_Spain.mp3");
    })

    var z = document.getElementById("button3");
    z.addEventListener("click", () => {
        playSound("/media/ambience_airport_heathrow_arrivals_hall_001.mp3");
    })



})


function playSound(path1) {
    var sound = new Howl({
        src: [path1],
    });
    sound.play();
    sound.fade(1, 0.0, 3000);
}