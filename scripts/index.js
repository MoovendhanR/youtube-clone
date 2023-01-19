console.log("yes")
const API="AIzaSyCZMnqTfi7zEgsaaZcKFhirl3OrJBHpFQ4";

let loadMostPopular = async () => {
try {
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${API}`);
    let data = await res.json();
    appendVideos(data.items);
    console.log(data.items);
} catch(err) {
    console.log(err);
}
}

let appendVideos = (data) => {
document.querySelector("#search-results").textContent = "";
data.forEach(element => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = element.snippet.thumbnails.medium.url;
    let h4 = document.createElement("h4");
    h4.textContent = element.snippet.title;
    let p = document.createElement("p");
    p.textContent = element.snippet.channelTitle;
    let views = document.createElement("p");
    views.textContent = element.statistics.viewCount + " views";
    div.append(img, h4, p, views);
    div.addEventListener("click", function() {
        localStorage.setItem("video-id", element.id);
        window.location.href = "./video.html";
    });
    document.querySelector("#search-results").append(div);
});
}

loadMostPopular();