/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
        describe('RSS Feeds', function() {
        /* This tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Tests if the URL property in feed is defined and it is not empty nor a negative number.
         */
        
        it('URL is defined and NOT empty', function(){
            
            for (let feed of allFeeds ){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            }
            
            
        });


        /* Tests if the property name in feed is defined and is not an empty string
         */
        
        it('Name is defined and NOT empty', function(){
            
            for (let feed of allFeeds ){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            }
            
            
        });
    });


        //Menu tests
        describe('The menu', function() {

                
                //Tests if the menu html element is hidden by default

                it('Menu is hidden by default', function(){
                expect($('body').hasClass('menu-hidden')).toBe(true);     
                });


            //Tests if the menu element toggles on/off when clicked
        
            
                it('Menu toggles', function(){
                    
                    //stores menu element in a variable
                
                    let menuIcon = $('.menu-icon-link');
                    
                    //recreates a click event
                    
                    menuIcon.click();
                    
                    //checks if the menu/hidden class is no longer present.
                    expect($('body').hasClass('menu-hidden')).toBe(false);
                    
                    //recreates another click event

                    menuIcon.click();
                    
                    //checks if the menu-hidden class is present again
                    expect($('body').hasClass('menu-hidden')).toBe(true);
                    
                    
                });
    
        
        });




        //Initial entries tests
        describe('Initial Entries', function() {
                //ensures that loadFeed is done running
                beforeEach(function(done){
                    
                loadFeed(0,done);
                    
                });
                
            
                it('loadFeed is called and completes work', function(){
                    //gets the number of entries from feed
                    const feedLen = document.querySelector('.feed').children.length; 

                                  
                    //if feedLen > 0 it means there is at least 1 entry.   
                   expect(feedLen).toBeGreaterThan(0);
                });

            
        });
    
    
    
        //Loads a different feed
        describe('New Feed Selection', function(){
        //sets a couple of veriables in the scope of the suite so that they can be set and accessed by before beforeEach() and it(). It sets them to null so that we can test if the original value changed.
            let initialFeed = null;
            let currentFeed = null;

                //ensures that loadFeed has been successfully finished before executing the tests
                beforeEach(function(done) {
                        //it loads the first feed and gets the text out of it. Then converts it to a string and gets a unique number from it
                        loadFeed(0);
                    
                        initialFeed = hashString($('.feed').text());
                        //it loads a second feed and finalizes the execution of beforeEach().
                        loadFeed(1,done);                                    
                });
            
            
                //Tests if the feed container can load a different feed.
                it('Feed is loaded and refreshes', function(){
                    
       
                    //gets a different feed, also convert it to a string and then converts it into a unique hash number.
                    currentFeed = hashString($('.feed').text());
                                        
                    //ensures that the original value of initialFeed and currentFeed have been reassigned to the hashes.
                    expect(initialFeed).not.toEqual(null);
                    expect(currentFeed).not.toEqual(null);
                    
                    //compares the two hashes. If they're different it means the feed loaded a different set of articles
                    expect(initialFeed).not.toEqual(currentFeed);
                    
                })
            
        });

    //Hash function. It gets a string and returns a 32 bit integer.
    function hashString (str) {
    var hash = 0;
    if (str.length == 0) {
        return hash;
    }
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; 
    }
    return hash;
    }
}());
