'use strict'; 
{
    const articleSelector = '.post';
    const titleSelector = '.post-title';
    const titleListSelector = '.titles';
    const articleTagsSelector = '.post-tags .list';
    const authorNameSelector = '.post-author';
    const listedArticles = document.querySelectorAll(articleSelector);
    const cloudClassCount = 3;
    const cloudClassPrefix = 'tag-size-';
    
    /* FUNCTION WHICH SHOWS SPECIFIC ARTICLE AFTER CLICKING ON TITLE LIST */

    const titleClickHandler = function(event){
        event.preventDefault();
        const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');
    
        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }
     
    /* [DONE] add class 'active' to the clicked link */

        clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll('.post.active');

        for(let activeArticle of activeArticles){
            activeArticle.classList.remove('active');
        }
    
    /* [DONE] get 'href' attribute from the clicked link */

        const articleIdSelector = clickedElement.getAttribute("href");

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        const targetArticle = document.querySelector(articleIdSelector);

    /* [DONE] add class 'active' to the correct article */

        targetArticle.classList.add('active');
     }

    /* FUNCTION THAT GENERATES TITLE LINKS */

    const generateTitleLinks = function(customSelector = '') {

        const listedArticlesWithCustomSelector = document.querySelectorAll(articleSelector + customSelector);

        /* [DONE] remove contents of titleList */

        const titleList = document.querySelector(titleListSelector);

        titleList.innerHTML = '';
      
        /* [DONE] for each article */

        for(let article of listedArticlesWithCustomSelector){
            
            /* [DONE] get the article id */

            const articleId = article.getAttribute("id");
        
            /* [DONE] find the title element */   
            /* [DONE] get the title from the title element */

            const titleName = article.querySelector(titleSelector).innerHTML;
        
            /* [DONE] create HTML of the link */

            const titleLinkHTML = '<li><a class="article-list" href="#' + articleId + '"><span>' + titleName + '</span></a></li>';

            /* [DONE] insert link into titleList */

            titleList.insertAdjacentHTML('beforeend', titleLinkHTML);

            /* [DONE] using titleClickHandler function - showing right specific article after click on article list */

            const links = document.querySelectorAll('.titles a');
    
            for(let link of links){
                link.addEventListener('click', titleClickHandler);
            }
        }   

        const firstActiveTitle = document.querySelector('.titles a');
        firstActiveTitle.classList.add('active'); 
    }   
    
    generateTitleLinks();

    /* FUNCTION THAT CALCULATES WHICH TAG IS LEAST AND MOST USED IN ALL ARTICLES */

    const calculateTagsParams = function(tags) {

        const params = {
            max: 0,
            min: 9999
        }

        for(let tag in tags){
            console.log('tag: ' + tag + ' is used: ' + tags[tag] + ' times');

            if(tags[tag] > params.max){
                params.max = tags[tag];
            }
    
            if(tags[tag] < params.min){
                params.min = tags[tag];
            }
        }
        
        return params;
    }

    /* FUNCTION THAT GENERATES CLASS FOR ESTABLISGING TAG SIZE DEPENDING ON THEIR OCCURENCE */

    const calculateClassTag = function(count, params) {

        const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * (cloudClassCount - 1) + 1 );

        return cloudClassPrefix + classNumber;
    }

    /* FUNCTION THAT GENERATES TAGS FOR ARTICLES */

    const generateTags = function (){
    
        /* [DONE] create a new variable allTags with an empty object */
        
        let allTags = {};

        /* [DONE] START LOOP: for every article: */

        for(let article of listedArticles){
        
            /* [DONE] find tags wrapper */
        
            const tagsWrapper = article.querySelector(articleTagsSelector);

            /* [DONE] make html variable with empty string */

            let html = '';
        
            /* [DONE] get tags from data-tags attribute */

            const tagNames = article.getAttribute('data-tags');
        
            /* [DONE] split tags into array */

            const articleTagsArray = tagNames.split(' ');
        
            /* [DONE] START LOOP: for each tag */

                for(let tag of articleTagsArray){
                
                /* [DONE] generate HTML of the link */

                const linkTagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

                /* [DONE] add generated code to html variable */

                html = html + linkTagHTML;

                /* [DONE] check if this link is NOT already in allTags */

                if(!allTags[tag]){
                    /* [NEW] add generated code to allTags object */
                    allTags[tag] = 1;
                }
                else {
                    allTags[tag]++;
                }
            }

            /* [DONE] insert HTML of all the links into the tags wrapper */
        
            tagsWrapper.innerHTML = html;
        }

        /* [DONE] find list of tags in right column */

        const tagList = document.querySelector('.tags');

        /* [DONE] add html from allTags to tagList */

        const tagsParams = calculateTagsParams(allTags);
        console.log('tagsParams:', tagsParams)

        let allTagsHTML = '';

        for(let tag in allTags){

            allTagsHTML += '<li><a href="#tag-' + tag + '" class="'+ calculateClassTag(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
        }

        tagList.innerHTML = allTagsHTML;
    }

    generateTags();

    const tagClickHandler = function(event){
        
        /* [DONE] prevent default action for this  event */

        event.preventDefault();
        
        /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

        const clickedElement = this;
      
        /* make a new constant "href" and read the attribute "href" of the clicked element */

        const href = clickedElement.getAttribute('href');
      
        /* make a new constant "tag" and extract tag from the "href" constant */
      
        const tag = href.replace('#tag-', '');

        /* find all tag links with class active */

        const tagLinksWithClassActive = document.querySelectorAll('a.active[href^="#tag-"]');
      
        /* LOOP for each active tag link and remove class active */

        for(let activeTag of tagLinksWithClassActive){
            activeTag.classList.remove('active');
        }

        /* find all tag links with "href" attribute equal to the "href" constant */
      
        const linksForSelectedTag = document.querySelectorAll('a[href="' + href + '"]');

        /* LOOP: for each found tag link add class active */
      
        for(let linkForSelectedTag of linksForSelectedTag){
            linkForSelectedTag.classList.add('active');
        }
      
        /* execute function "generateTitleLinks" with article selector as argument */

        generateTitleLinks('[data-tags~="' + tag + '"]');
    }

    function addClickListenersToTags(){
        /* find all links to tags */

        const tags = document.querySelectorAll('.post-tags a');
        const tagsFromCloud = document.querySelectorAll('.tags a');

        /* START LOOP: for each link && add tagClickHandler as event listener for that link && END LOOP: for each link */
      
        for(let tag of tags){
            tag.addEventListener('click', tagClickHandler);
        }

        for(let tag of tagsFromCloud){
            tag.addEventListener('click', tagClickHandler);
        }
    }
      
    addClickListenersToTags();

    /* FUNCTION THAT GENERATES AUTHOR NAMES UNDERNEATH ARTICLE TITLE */
      
    const generateAuthors = function(){

        /* [DONE] start loop for every article */

        for(let article of listedArticles){
            
            /* [DONE] find wrapper for authors name */

            const authorNameDiv = article.querySelector(authorNameSelector);

            /* [DONE] make html variable with "by" string */

            let html = 'by ';

            /* [DONE] get data-author attribute from article data-author property */

            const authorName = article.getAttribute('data-author');

            /* [DONE] create proper html syntax */
        
            const authorHTML = '<a href="#author-' + authorName + '">' + authorName + '</a>'

            /* [DONE] add generated html to variable */
            
            html = html + authorHTML;

            /* [DONE] insert html variable to wrapper for authors name */

            authorNameDiv.innerHTML = html;
        }
    }

    generateAuthors();

    const authorClickHandler = function(event){

        event.preventDefault();

        const clickedElement = this;

        const clickedElementId = clickedElement.getAttribute('href');

        const authorName = clickedElementId.replace('#author-', '');

        const allActiveAuthors = document.querySelectorAll('a.active[href^="#author-"]');

        for (let activeAuthor of allActiveAuthors) {
            activeAuthor.classList.remove('active');
        }

        const selectedAuthorLinks = document.querySelectorAll('a[href="' + clickedElementId + '"]');

        for (let selectedAuthorLink of selectedAuthorLinks) {
            selectedAuthorLink.classList.add('active');
        }

        generateTitleLinks('[data-author = "' + authorName + '"]');
    }

    function addClickListenersToAuthors(){

        const authors = document.querySelectorAll('.post-author a')

        for(let author of authors){
            author.addEventListener('click', authorClickHandler);
        }
    }

    addClickListenersToAuthors();
}