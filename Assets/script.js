//Tab variables and functions
var stateSearch = $('#state-search');
var actSearch = $('#activity-search');


$('#stateTab').click(function(event){
    event.preventDefault();
    console.log('state');
    stateSearch.attr('style','display: ;');
    actSearch.attr('style','display: none;');
    $('#actTab').removeClass('is-active');
    $('#stateTab').addClass('is-active');
});

$('#actBtn').click(function(event){
    event.preventDefault();
    console.log('act');
    stateSearch.attr('style','display: none;');
    actSearch.attr('style','display: ;');
    $('#stateTab').removeClass('is-active');
    $('#actTab').addClass('is-active');
});
//end tab functions

// Search button functions
$('#stateSearchBtn').click(function(){
  var selectedState = $('#user-select-state').val();
  var keyAPI1 = 'kKdZBz5WfXYXbVr9X3e2Y6bYqadiMvS9mT17Qasp'
  var queryURL1 = 'https://developer.nps.gov/api/v1/parks?stateCode='+ selectedState + '&api_key=' + keyAPI1;
  if (selectedState !== 'Select a State') {
      $('#search-results').attr('style', 'display: ;');
      $('#instructions').attr('style', 'display: none;');
      $('#park-info').attr('style', 'display: none;');
      console.log('display results');
      console.log(selectedState);

    fetch(queryURL1).then(function(response) {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      //need to figure out how to clear previous list
      
      // create new list
      var newList = $('<div class="panel" style="max-height: 450px; overflow-y: scroll;";></div>');

      data.data.forEach(function(park) {
        const parkLink = $(`<a class="panel-block" data-parkcode=${park.parkCode}></a>`);
        const icon = $('<span class="panel-icon"><i class="fad fa-trees" aria-hidden="true"></i></span>');
        const parkName = $(`<span>${park.fullName}</span>`);
        parkLink.append(icon, parkName);
        newList.append(parkLink);

      });
        //clearing previous result and keeping header
        $('#search-results').html(`<p class="panel-heading is-italic">Search Results</p>`);
        // insert new list after first child element
        $('#search-results').append(newList);
    })
    .catch(function(error) {
      console.error(error);
    });

      
  } else {return};
});

$('#actSearchBtn').click(function(){
  var selectedActivity = $('#user-select-activity').val();
  var keyAPI2 = 'kKdZBz5WfXYXbVr9X3e2Y6bYqadiMvS9mT17Qasp';
  var queryURL2 = 'https://developer.nps.gov/api/v1/activities/parks?q=' + selectedActivity + '&api_key=' + keyAPI2;
  if (selectedActivity !== 'Select an Activity') {
      $('#search-results').attr('style', 'display: ;');
      $('#instructions').attr('style', 'display: none;');
      console.log('display results');
      console.log(selectedActivity);

    fetch(queryURL2).then(function(response) {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      console.log(typeof data);

      console.log(data.data[0].parks[0].fullName);
      console.log(data.data[0].parks[0].parkCode);

      //create new list
      var newList = $('<div class="panel" style=" max-height: 450px; overflow-y: scroll;"></div>');

      data.data.forEach(function(activity) {
        if (activity.name === selectedActivity) {
          activity.parks.forEach(function(park) {
            const parkLink = $(`<a class="panel-block" data-parkcode=${park.parkCode}></a>`);
            const icon = $(`<span class="panel-icon"><i class="fad fa-trees" aria-hidden="true"></i></span>`);
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
    .catch(function(error) {
      console.log('Error fetching data:', error);
    });
  }
});

   
// display park information
$("body").on("click", "a.panel-block", function(){
var selectedParkCode = $(this).data("parkcode");
console.log("Selected park code : " + selectedParkCode);
var keyAPI1 = 'kKdZBz5WfXYXbVr9X3e2Y6bYqadiMvS9mT17Qasp'
var parkInfoUrl = 'https://developer.nps.gov/api/v1/parks?parkcode='+ selectedParkCode + '&limit=10&api_key=' + keyAPI1;
if (selectedParkCode !== '') {
  fetch(parkInfoUrl).then(function(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then(function(data) {
    
    
      $('#instructions').attr('style', 'display: none;');
      $('#search-results').attr('style', 'display: none;');
      $('#park-info').attr('style', 'display: block;');
    var parkInfo = data.data[0];
    //var parkAddress = parkInfo.addresses[0];

    searchHistoryList(parkInfo);

    $("#park-info").html(`<p class="panel-heading is-italic title">${parkInfo.fullName}</p>`);

    $('#park-info').append(`<figure class="image is-128x128">
    <img src=${parkInfo.images[0].url}></img>
    </figure>`);

    $('#park-info').append(`<p><b>Park Description:</b>${parkInfo.description}</p>`);

    var parkActivities = "";
    if(parkInfo.activities.length>0)
    {
      parkInfo.activities.forEach(function(activity){
       parkActivities=parkActivities +activity.name + ",";
      });
  
    }
    
    
    $('#park-info').append(`<p><b>Park Activities:</b>${parkActivities}</p>`);


   var parkAddress = parkInfo.addresses[0].line1 + "," + parkInfo.addresses[0].line2 + "," + parkInfo.addresses[0].line3 + "," + parkInfo.addresses[0].city + "," + parkInfo.addresses[0].postalCode + ".";

$('#park-info').append(`<p><b>Park Address:</b>${parkAddress}</p>`);

   
    
   
  });
}  else {return};
}); 


var savedSearches = [];
// make list of previously searched parkNames
var searchHistoryList = function(parkInfo) {
    parkName= parkInfo.fullName;
    parkCode=parkInfo.parkCode;

    console.log(parkCode);
    
    $('.past-search:contains("' + parkName + '")').remove();
    // create entry with city name
    var searchHistoryEntry = $(`<a class="past-search" data-parkcode=${parkCode} href="#">${parkName}</a>`);

    // create container for entry
    var searchEntryContainer = $("<div>");
    searchEntryContainer.addClass("past-search-container");
    // append entry to container
    searchEntryContainer.append(searchHistoryEntry);
    // append entry container to search history container
    var searchHistoryContainerEl = $("#search-history-container");
    searchHistoryContainerEl.append(searchEntryContainer);
    if (savedSearches.length >0) 
    {
        // update savedSearches array with previously saved searches
        var previousSavedSearches = localStorage.getItem("savedSearches");
        savedSearches = JSON.parse(previousSavedSearches);
    }
    // add city name to array of saved searches
    savedSearches.push(parkName,parkCode);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
    // reset search input. 
    $("#search-input").val("");
  };


var loadSearchHistory = function ()
{
  // get saved search history
  var savedSearchHistory = localStorage.getItem("savedSearches");
  // return false if there is no previous saved searches
  if (!savedSearchHistory)
  {
    return false;
  }
  // turn saved search history string into array
  savedSearchHistory = JSON.parse(savedSearchHistory);
  // go through savedSearchHistory array and make entry for each item in the list
  for (var i = 0; i < savedSearchHistory.length; i++)
  {
    searchHistoryList(savedSearchHistory[i]);
  }
};

$("#btn-clear").on("click", function ()
{
 $('#search-history-container').empty();
  localStorage.clear();
})

$("body").on("click", "a.past-search", function ()
{
  var selectedParkCode = $(this).data("parkcode");
  console.log("Selected park code : " + selectedParkCode);
  var keyAPI1 = 'kKdZBz5WfXYXbVr9X3e2Y6bYqadiMvS9mT17Qasp'
  var parkInfoUrl = 'https://developer.nps.gov/api/v1/parks?parkcode=' + 
  selectedParkCode + '&limit=10&api_key=' + keyAPI1;
  if (selectedParkCode !== '') {
    fetch(parkInfoUrl).then(function (response) {
      if (!response.ok)
      {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(function (data) 
    {
      $('#instructions').attr('style', 'display: none;');
      $('#search-results').attr('style', 'display: none;');
      $('#park-info').attr('style', 'display: block;');
      var parkInfo = data.data[0];
      $("#park-info").html(`<p class="panel-heading is-italic title">${parkInfo.fullName}</p>`);
      $('#park-info').append(`<figure class="image is-128x128">
       <img src=${parkInfo.images[0].url}></img>
      </figure>`);
      $('#park-info').append(`<p><b>Park Description:</b>${parkInfo.description}</p>`);
      var parkActivities = "";
      if (parkInfo.activities.length > 0) 
      {
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

loadSearchHistory();