// script.js
import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        
        newPost.addEventListener('click', () => {
        
          window.history.pushState({page_id: 1, journalEntry: entry}, "JournalEntry", "#entry" + entryNum(entry)); 
          setState(entry); 
        });
      });
    });

    document.querySelector('h1').addEventListener('click', ()=> { 
  
      if (window.location.hash != ""){ 

        window.history.pushState({page_id: 0}, "homePage", window.origin + "/Lab7/");
        setState(); 
      }
    });

    
    document.querySelector('img').addEventListener('click', ()=> {
 
      if (window.location.hash != "#settings"){ 
       
        window.history.pushState({page_id: 2}, "settingsPage", "#settings"); 
        setState(); 
      }
    });
 


    window.addEventListener('popstate', (event)=>{

      if (event.state == null){ 
        setState(); 
        return;
      }
     
      if (event.state.page_id == 1){
        setState(event.state.journalEntry);
      }
      else{
        setState(); 
      }
    });
});


function entryNum(entry){

  let allEntries = document.querySelectorAll('journal-entry'); 

  for(let i = 0; i < allEntries.length; i++){
    if(allEntries[i].entry.title == entry.title && allEntries[i].entry.date == entry.date && allEntries[i].entry.content == entry.content) {
      return i + 1; 
      
    }
  }

  return 0; 
  
}