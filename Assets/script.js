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
  var queryURL1 = 'https://developer.nps.gov/api/v1/parks?stateCode='+ selectedState + '&limit=10&api_key=' + keyAPI1;
  if (selectedState !== 'Select a State') {
      $('#search-results').attr('style', 'display: ;');
      $('#instructions').attr('style', 'display: none;');
      $('#search-results').attr('style', 'display: ;');
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
      const newList = $('<div class="panel"></div>');

      data.data.forEach(function(park) {
        const parkLink = $(`<a class="panel-block" data-parkcode=${park.parkCode}></a>`);
        const icon = $('<span class="panel-icon"><i class="fad fa-trees" aria-hidden="true"></i></span>');
        const parkName = $(`<span>${park.fullName}</span>`);
        parkLink.append(icon, parkName);
        newList.append(parkLink);
      });

      // insert new list after first child element
      $('#search-results').children().first().after(newList);
    })
    .catch(function(error) {
      console.error(error);
    });

      
  } else {return};
});


$('#actSearchBtn').click(function(){
    var selectedActivity = $('#user-select-activity').val();
    if (selectedActivity !== 'Select an Activity') {
        console.log(selectedActivity);
        // Call the api function here and pass the selectedOption variable as input
        // example: myOtherFunction(selectedOption);
        clearPrevList();
    } else {return};
  });
