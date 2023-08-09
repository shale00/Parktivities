//Tab variabless
var stateSearch = $('#state-search');
var actSearch = $('#activity-search');

//tab funactions
$('#stateTab').click(function (event) {
  event.preventDefault();
  
  stateSearch.attr('style', 'display: ""');
  actSearch.attr('style', 'display: none;');
  $('#actTab').removeClass('is-active');
  $('#stateTab').addClass('is-active');
});

$('#actBtn').click(function (event) {
  event.preventDefault();
 
  stateSearch.attr('style', 'display: none;');
  actSearch.attr('style', 'display: ""');
  $('#stateTab').removeClass('is-active');
  $('#actTab').addClass('is-active');
});
//end tab functions

// Search button functions
$('#stateSearchBtn').click(function () {
  var selectedState = $('#user-select-state').val();
  var keyAPI1 = 'kKdZBz5WfXYXbVr9X3e2Y6bYqadiMvS9mT17Qasp'
  var queryURL1 = 'https://developer.nps.gov/api/v1/parks?stateCode=' + selectedState + '&api_key=' + keyAPI1;
  if (selectedState !== 'Select a State') {
    $('#search-results').attr('style', 'display: ;');
    $('#instructions').attr('style', 'display: none;');
    
    fetch(queryURL1).then(function (response) {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
      .then(function (data) {
        // create new list
        var newList = $('<div class="panel" style="max-height: 450px; overflow-y: scroll";></div>');
        data.data.forEach(function (park) {
          const parkLink = $(`<a class="panel-block" data-parkcode=${park.parkCode}></a>`);
          const icon = $('<span class="panel-icon"><i class="fas fa-tree" aria-hidden="true"></i></span>');
          const parkName = $(`<span>${park.fullName}</span>`);
          parkLink.append(icon, parkName);
          newList.append(parkLink);
        });
        //clearing previous result and keeping header
        $('#search-results').html(`<p class="panel-heading is-italic">Search Results</p>`);
        // insert new list after first child element
        $('#search-results').append(newList);
      })
      .catch(function (error) {
        console.error(error);
      });
  } else {
    $('#modal').attr('class','modal is-active');
  };
});

$('#actSearchBtn').click(function () {
  var selectedActivity = $('#user-select-activity').val();
  var keyAPI2 = 'kKdZBz5WfXYXbVr9X3e2Y6bYqadiMvS9mT17Qasp';
  var queryURL2 = 'https://developer.nps.gov/api/v1/activities/parks?q=' + selectedActivity + '&api_key=' + keyAPI2;
  if (selectedActivity !== 'Select an Activity') {
    $('#search-results').attr('style', 'display: ;');
    $('#instructions').attr('style', 'display: none;');
    
    fetch(queryURL2).then(function (response) {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
      .then(function (data) {

        //create new list
        var newList = $('<div class="panel" style=" max-height: 450px; overflow-y: scroll;"></div>');

        data.data.forEach(function (activity) {
          if (activity.name === selectedActivity) {
            activity.parks.forEach(function (park) {
              const parkLink = $(`<a class="panel-block" data-parkcode=${park.parkCode}></a>`);
              const icon = $(`<span class="panel-icon"><i class="fas fa-tree" aria-hidden="true"></i></span>`);
              const parkName = $(`<span>${park.fullName}</span>`);
              parkLink.append(icon, parkName);
              newList.append(parkLink);
            });
            //clearing previous result and keeping header
            $('#search-results').html(`<p class="panel-heading is-italic">Search Results</p>`);
            // insert new list after first child element
            $('#search-results').append(newList);
          }
        });
      })
      .catch(function (error) {
        console.log('Error fetching data:', error);
      });
  } else {
    $('#modal').attr('class','modal is-active');
  };
});


// display park information
$("body").on("click", "a.panel-block", function () {
  var selectedParkCode = $(this).data("parkcode");
  var keyAPI1 = 'kKdZBz5WfXYXbVr9X3e2Y6bYqadiMvS9mT17Qasp'
  var parkInfoUrl = 'https://developer.nps.gov/api/v1/parks?parkcode=' + selectedParkCode + '&limit=10&api_key=' + keyAPI1;
  if (selectedParkCode !== '') {
    fetch(parkInfoUrl).then(function (response) {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
      .then(function (data)
      {
        $('#instructions').attr('style', 'display: none;');
        // $('#search-results').attr('style', 'display: none;');
        $('#park-info').attr('style', 'display: block;');
        var parkInfo = data.data[0];
        searchHistoryList(parkInfo);
        $("#park-info").html(`<p class="panel-heading is-italic title">${parkInfo.fullName}</p>`);
        $('#park-info').append(`<figure class="image ">

    <img src=${parkInfo.images[0].url}></img>
    </figure>`);

      $('#park-info').append(`<p><b>Park Description:</b>${parkInfo.description}</p>`);

        var parkActivities = "";
        if (parkInfo.activities.length > 0) {
          parkInfo.activities.forEach(function (activity) 
          {
            parkActivities = parkActivities + activity.name + ",";
          });

        }

      $('#park-info').append(`<p><b>Park Activities:</b>${parkActivities}</p>`);
    
      var parkAddress = parkInfo.addresses[0].line1 + "," + parkInfo.addresses[0].line2 + "," + parkInfo.addresses[0].line3 + "," + parkInfo.addresses[0].city + "," + parkInfo.addresses[0].postalCode + ".";

        $('#park-info').append(`<p><b>Park Address:</b>${parkAddress}</p>`);

        var statecode = data.data[0].states;
        //Switch Function to determine which state to search for in wiki api
        switch (statecode) {
          case "AL":
            flagof = "Alabama";
            break;
          case "AK":
            flagof = "Alaska";
            break;
          case "AZ":
            flagof = "Arizona";
            break;
          case "AR":
            flagof = "Arkansas";
            break;
          case "CA":
            flagof = "California";
            break;
          case "CO":
            flagof = "Colorado";
            break;
          case "CT":
            flagof = "Connecticut";
            break;
          case "DE":
            flagof = "Delaware";
            break;
          case "FL":
            flagof = "Florida";
            break;
          case "GA":
            flagof = "Georgia";
            break;
          case "HI":
            flagof = "Hawaii";
            break;
          case "ID":
            flagof = "Idaho";
            break;
          case "IL":
            flagof = "Illinois";
            break;
          case "IN":
            flagof = "Indiana";
            break;
          case "IA":
            flagof = "Iowa";
            break;
          case "KS":
            flagof = "Kansas";
            break;
          case "KY":
            flagof = "Kentucky";
            break;
          case "LA":
            flagof = "Louisiana";
            break;
          case "ME":
            flagof = "Maine";
            break;
          case "MD":
            flagof = "Maryland";
            break;
          case "MA":
            flagof = "Massachusetts";
            break;
          case "MI":
            flagof = "Michigan";
            break;
          case "MN":
            flagof = "Minnesota";
            break;
          case "MS":
            flagof = "Mississippi";
            break;
          case "MO":
            flagof = "Missouri";
            break;
          case "MT":
            flagof = "Montana";
            break;
          case "NE":
            flagof = "Nebraska";
            break;
          case "NV":
            flagof = "Nevada";
            break;
          case "NH":
            flagof = "New_Hampshire";
            break;
          case "NJ":
            flagof = "New_Jersey";
            break;
          case "NM":
            flagof = "New_Mexico";
            break;
          case "NY":
            flagof = "New_York";
            break;
          case "NC":
            flagof = "North_Carolina";
            break;
          case "ND":
            flagof = "North_Dakota";
            break;
          case "OH":
            flagof = "Ohio";
            break;
          case "OK":
            flagof = "Oklahoma";
            break;
          case "OR":
            flagof = "Oregon";
            break;
          case "PA":
            flagof = "Pennsylvania";
            break;
          case "RI":
            flagof = "Rhode_Island";
            break;
          case "SC":
            flagof = "South_Carolina";
            break;
          case "SD":
            flagof = "South_Dakota";
            break;
          case "TN":
            flagof = "Tennessee";
            break;
          case "TX":
            flagof = "Texas";
            break;
          case "UT":
            flagof = "Utah";
            break;
          case "VT":
            flagof = "Vermont";
            break;
          case "VA":
            flagof = "Virginia";
            break;
          case "WA":
            flagof = "Washington";
            break;
          case "WV":
            flagof = "West_Virginia";
            break;
          case "WI":
            flagof = "Wisconsin";
            break;
          case "WY":
            flagof = "Wyoming";
            break;
          default:
            flagof = "the_United_States"
        }

        //Sets up URl for request
        var url = "https://en.wikipedia.org/w/api.php";
        var params = {
          action: "query",
          titles: "File:Flag_of_" + flagof + ".svg",
          format: "json",
          prop: "imageinfo",
          iiprop: "url"
        };

        url = url + "?origin=*";
        Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

        async function geturl() {
          response = await fetch(url);
          wikidata = await response.json();

          dataset = JSON.parse(JSON.stringify(wikidata));
          key = Object.keys(dataset.query.pages);
          //Converts JSON info to get an array with the image url
          imgurl = Object.values(dataset.query.pages[key].imageinfo[0].url);
          //converts Image URL from array to string
          imgurl = imgurl.join("");
          document.getElementById("park-presentation").style.display = "block";
          document.getElementById("flagpic").src = imgurl;
          document.getElementById("flagpic").width = "200";
          document.getElementById("flagpic").height = "150";
        };

        geturl();





      });
  } else { return };
});


var savedSearches = [];
// make list of previously searched parkNames
var searchHistoryList = function (parkInfo) 
{
  parkName = parkInfo.fullName;
  parkCode = parkInfo.parkCode;
  $('.past-search:contains("' + parkName + '")').remove();
  // create entry with city name
  var searchHistoryEntry = $(`<a class="past-search panel-block" data-parkcode=${parkCode} href="#">${parkName}</a>`);
  // create container for entry
  var searchEntryContainer = $("<div>");
  searchEntryContainer.addClass("past-search-container");
  // append entry to container
  searchEntryContainer.append(searchHistoryEntry);
  // append entry container to search history container
  var searchHistoryContainerEl = $("#search-history-container");
  searchHistoryContainerEl.append(searchEntryContainer);
  if (savedSearches.length > 0) {
    // update savedSearches array with previously saved searches
    var previousSavedSearches = localStorage.getItem("savedSearches");//form load
    savedSearches = JSON.parse(previousSavedSearches);
  }
  // add city name to array of saved searches
  var parkObj = { fullName: parkInfo.fullName, parkCode: parkInfo.parkCode };
  savedSearches.push(parkObj);
  localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
  // reset search input. 
  $("#search-input").val("");
};


// load data in seach history list from local storage
var loadSearchHistory = function () {
  // get saved search history
  var savedSearchHistory = JSON.parse(localStorage.getItem("savedSearches"));
  // return false if there is no previous saved searches
  if (!savedSearchHistory) {
    return false;
  }
  // turn saved search history string into array
  // go through savedSearchHistory array and make entry for each item in the list
  for (var i = 0; i < savedSearchHistory.length; i++) {
    searchHistoryList(savedSearchHistory[i]);
  }
};

// clear history button to clear previous history of park names from list and local storage.
$("#btn-clear").on("click", function () {
  $('#search-history-container').empty();
  localStorage.clear();
})

// when click on park name in previous search history list again park information will display.
$("body").on("click", "a.past-search", function () {
  var selectedParkCode = $(this).data("parkcode");
  // api key and url to fetch park information
  var keyAPI1 = 'kKdZBz5WfXYXbVr9X3e2Y6bYqadiMvS9mT17Qasp'
  var parkInfoUrl = 'https://developer.nps.gov/api/v1/parks?parkcode=' +
    selectedParkCode + '&limit=10&api_key=' + keyAPI1;
  if (selectedParkCode !== '') {
    fetch(parkInfoUrl).then(function (response) {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
      .then(function (data) {
        $('#instructions').attr('style', 'display: none;');
        // $('#search-results').attr('style', 'display: none;');
        $('#park-info').attr('style', 'display: block;');
        var parkInfo = data.data[0];
        $("#park-info").html(`<p class="panel-heading is-italic title">${parkInfo.fullName}</p>`);
        $('#park-info').append(`<figure class="image ">
       <img src=${parkInfo.images[0].url}></img>
      </figure>`);
        $('#park-info').append(`<p><b>Park Description:</b>${parkInfo.description}</p>`);
        var parkActivities = "";
        if (parkInfo.activities.length > 0) {
          parkInfo.activities.forEach(function (activity) {
            parkActivities = parkActivities + activity.name + ",";
          });
        }
        $('#park-info').append(`<p><b>Park Activities:</b>${parkActivities}</p>`);
        var parkAddress = parkInfo.addresses[0].line1 + "," + parkInfo.addresses[0].line2 + "," + parkInfo.addresses[0].line3 + "," + parkInfo.addresses[0].city + "," + parkInfo.addresses[0].postalCode + ".";
        $('#park-info').append(`<p><b>Park Address:</b>${parkAddress}</p>`);

      });
  } else { return };
});

// loadSearchHistory() function call 
loadSearchHistory();

//Close modal listeners and function
(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
  const $target = $close.closest('.modal');

  $close.addEventListener('click', () => {
    closeModal($target);
  });
});

function closeModal() {
  document.getElementById("modal").classList.remove("is-active");
}
        