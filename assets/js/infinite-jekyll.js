$(function() {
  'use strict';
  
  var currentPage = 1,
      isFetchingPosts = false,
      shouldFetchPosts = true,
      isHomePage = $(".post-card-box").length > 0;

  // Support both .post-list (tags page) and .post-card-box (home page)
  var postContainer = $(".tag-master:not(.hidden) .post-list").length > 0 
                      ? $(".tag-master:not(.hidden) .post-list") 
                      : $(".post-card-box");
  var loadNewPostsThreshold = 300;

  // If there's no spinner, it's not a page where posts should be fetched
  if ($(".spinner").length < 1)
    shouldFetchPosts = false;
  
  // Function to check if we need more posts to fill the viewport
  function checkAndLoadMore() {
    if (!shouldFetchPosts || isFetchingPosts) return;
    
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();
    
    // If the document is shorter than the window, load more posts
    if (documentHeight <= windowHeight + loadNewPostsThreshold) {
      fetchPosts();
    }
  }
  
  // Check on initial load
  setTimeout(checkAndLoadMore, 100);
	
  // Are we close to the end of the page? If we are, load more posts
  $(window).scroll(function(e){
    if (!shouldFetchPosts || isFetchingPosts) return;
    
    var windowHeight = $(window).height(),
        windowScrollPosition = $(window).scrollTop(),
        bottomScrollPosition = windowHeight + windowScrollPosition,
        documentHeight = $(document).height();
    
    // If we've scrolled past the loadNewPostsThreshold, fetch posts
    if ((documentHeight - loadNewPostsThreshold) < bottomScrollPosition) {
      fetchPosts();
    }
  });
  
  // Fetch a chunk of posts from the next paginated page
  function fetchPosts() {
    if (isFetchingPosts) return;
    
    isFetchingPosts = true;
    currentPage++;
    
    // Construct the URL for the next page
    var nextPageURL = currentPage === 2 ? './page2/' : './page' + currentPage + '/';
    
    $.get(nextPageURL, function(data) {
      var html = $(data);
      
      if (isHomePage) {
        // For home page: extract post cards
        var newPosts = html.find('.post-card-box li');
        
        if (newPosts.length > 0) {
          newPosts.appendTo('.post-card-box');
          isFetchingPosts = false;
          // Check if we need to load more to fill the viewport
          setTimeout(checkAndLoadMore, 100);
        } else {
          // No more posts to load
          disableFetching();
        }
      } else {
        // For tag pages: use original logic
        var newPosts = html.find('.post');
        
        if (newPosts.length > 0) {
          newPosts.appendTo('.tag-master:not(.hidden) .post-list');
          isFetchingPosts = false;
          setTimeout(checkAndLoadMore, 100);
        } else {
          disableFetching();
        }
      }
    }).fail(function() {
      // Failed to load page (probably no more pages)
      disableFetching();
    });
  }
  
  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    $(".spinner").fadeOut();
  }
	
});
