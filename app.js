// @gokuvinoth
//   create final element and append to display the full content in HTML
let resultElement = document.querySelector("#movies");
let APIData = [];

// Calling the movie result api

const xhr = new XMLHttpRequest();
xhr.responseType = "json";
xhr.onreadystatechange = () => {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    APIData = xhr.response;
    // function call to process api result
    displayListView(APIData);
  }
};
// url to call api
xhr.open("GET", "https://vast-basin-71998.herokuapp.com/movie");
xhr.send();

// mapping response to respective HTML elements
renderHtml = responseData => {
  return `<div class="movie">
    <h2 class="movie-title" id=${chkNull(
      responseData._id,
      "To be Named"
    )}>${chkNull(responseData.title, "To be Named")}</h2>
    <img class="movie-poster" id=${chkNull(
      responseData._id,
      "To be Named"
    )} src="${responseData.poster}" alt=${chkNull(
    responseData.title,
    "hero and heroine"
  )}>
    <ul class="movie-info" id=${chkNull(responseData._id, "To be Named")}>
        <li class="movie-show-time" id=${chkNull(
          responseData._id,
          "To be Named"
        )}><a class="movie-more-info" id=${chkNull(
    responseData._id,
    "To be Named"
  )} href="#">${chkNull(
    responseData.sessions[0].sessionDateTime[0],
    "Coming Soon"
  )}</a></li>
        <li class="movie-language" id=${chkNull(
          responseData._id,
          "To be Named"
        )}>${chkNull(responseData.language, "All Languages")}</li>
    </ul>
</div>`;
};

const chkNull = (val, defaultVal) => {
  if (val) {
    return val;
  } else return defaultVal;
};

const displayListView = apiData => {
  resultElement.innerHTML = apiData.map(data => renderHtml(data)).join("\n");
  let thumbnails = document.querySelectorAll("#movies > div > img");
  thumbnails.forEach(function(thumbnail) {
    thumbnail.addEventListener("click", function() {
      // Set clicked image as display image.
      NavDetailview(thumbnail.id);
    });
  });
};

const NavDetailview = id => {
  console.log(typeof APIData[0]._id);
  var ojectsArray = APIData.find(function(element) {
    return element._id === id;
  });
  console.log(ojectsArray);
  console.log(3.5 - (3.5 % 1));

  resultElement.innerHTML = ` <div class="movie-details-tcontainer" id="${
    ojectsArray._id
  }">
  <div class="movie-details-trailer" id="${ojectsArray._id}">
      <iframe class="movie-trailer" id="${
        ojectsArray._id
      }" src="https://www.youtube.com/embed/${
    ojectsArray.trailer.split("=")[1]
  }" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
  <div class="movie-details-info" id="${ojectsArray._id}">
      <div class="movie-info-list" id="${ojectsArray._id}">
          <div class="movie-genre" id="${
            ojectsArray._id
          }">Genre : Commercial</div>
          <div class="movie-duration" id="${
            ojectsArray._id
          }">Duration : 2h 30m <span class="fa fa-hourglass-half"
                  aria-hidden="true"></span></div>
          <div class="movie-rating" id="${ojectsArray._id}">
          ${(
            '<i class="fa fa-star movie-star-rating" id="' +
            ojectsArray._id +
            '" aria-hidden=" true"></i>'
          ).repeat(3)}
              <i class="fa fa-star-half-o movie-star-rating" id="${
                ojectsArray._id
              }" aria-hidden=" true"></i>
              <i class="fa fa-star-o movie-star-rating" id="${
                ojectsArray._id
              }" aria-hidden=" true"></i>
          </div>
          <div class="movie-details-session">
              <i class="fa fa-calendar movie-session-calendar" id="${
                ojectsArray._id
              }" aria-hidden="true"></i>
              20 Dec 2018
              <br><i class="fa fa-clock-o movie-session-clock" id="${
                ojectsArray._id
              }" aria-hidden="true"></i>
              9 pm</div>
      </div>
  </div>
</div>
<div class="movie-details-story-container" id="${ojectsArray._id}">
  <div class="movie-details-story" id="${ojectsArray._id}">
      <div class="movie-details-title"> ${ojectsArray.title}</div>${
    ojectsArray.synopsis
  }
      <br>
      <div class="movie-details-title"><i class="fa fa-users" aria-hidden="true"></i>Starring</div>
      <ul class="movie-cast-list" id="${ojectsArray._id}">
       
      ${ojectsArray.leadActors
        .split(",")
        .map(leadActor => {
          return '<li class="movie-cast-name" id="">' + leadActor + "</li>";
        })
        .join("\n")}
<br>
${Object.keys(ojectsArray.crew)
    .map(crew => {
      return (
        '<li class="movie-cast-name" id="">' +
        crew +
        " : " +
        ojectsArray.crew[crew] +
        "</li>"
      );
    })
    .join("\n")}
      </ul>

  </div>
  <div class="movie-details-booking" id="${ojectsArray._id}">
      <button class="movie-book-btn"><i class="fa fa-ticket movie-ticket" id="${
        ojectsArray._id
      }" aria-hidden="true"></i>Book
          now</button>
      <button class="movie-back-btn" id="detailsBackBtn"><i class="fa fa-undo previous-page" id="${
        ojectsArray._id
      }" aria-hidden="true"></i>Back</button>

  </div>


</div>
`;

  let backBtn = document.querySelector("#detailsBackBtn");
  backBtn.addEventListener("click", function() {
    displayListView(APIData);
    // window.history.back();
    console.log("clicked back");
  });
};
