# Parktivities
An application to find national parks and their activities.

## Description
The Parktivies application shows general information about a National park or site. If a user wants to plan a trip, then it's easy to see which park has which activities. In this application the user can see a particular national park's name and information. We built this application using HTML, CSS, Javascript, jQuery, Bulma css framework and two server side API's. The main purpose of this project was to improve skills in frontend development.


## Installation
N/A

## Usage
In the Parktivities application the user has two options on how they can search for a national park (or site): via State or Activity. The user can click on either the State or Activity tab and make a selection from either respective dropdown. Once a selection is made and the user clicks the 'search' button, a list of search results will display below the search box. The user can then scroll through the results (if applicable) and click on a park to view a picture from the park or site, a short description of the park or site, a list of activities available to do at the park or site, and the address of the location. The second API will display the state flag the park is located in. If the park or site is in multiple states, the flag displayed will the the U.S. flag. When a user clicks on a park to view it's information, that park is saved in localStorage so that the user can reference it at a later time (after leaving and then returning to the app). Clicking the 'clear history' button will remove the list of parks visited.

1. The URL of the Parktivities functional, deployed application - https://shale00.github.io/Parktivities/
2. The URL of the GitHub repository - https://github.com/shale00/Parktivities
3. Screenshots of the Parktivities application:

![Main page for state search](Assets/Images/first%20page.png)
![state select](Assets/Images/select%20state.png)
![parknames for particular state park](Assets/Images/park%20names.png)
![park Information](Assets/Images/park%20information.png)
![Main page for activity search](Assets/Images/main%20page_activityserach.png)
![select activity](Assets/Images/select%20activity.png)
![parknames for particular activity](Assets/Images/Park%20name%20for%20particular%20activity.png)
![search history](./Assets/Images/Screen%20Shot%202023-03-26%20at%209.13.16%20PM.png)
![state flag](Assets/Images/state%20flag%20for%20particular%20park.png)
![local storage](Assets/Images/local%20storage.png)

## Credits
The Parktivities application was made with javascript, css and server side api as below.
1. Bulma css framework - https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css
2. For font style - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css
3. jQuery - https://code.jquery.com/jquery-3.6.4.js
4. Server side API's:
    For park information - https://developer.nps.gov
    For state flag - https://en.wikipedia.org

## License

MIT License

