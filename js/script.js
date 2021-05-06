'use strict'; 
{
    const articleSelector = '.post';
    const titleSelector = '.post-title';
    const titleListSelector = '.titles';
    const articleTagsSelector = ".post-tags .list";
    const authorNameSelector = ".post-author";
    const listedArticles = document.querySelectorAll(articleSelector);
    
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

    /* FUNCTION THAT GENERATES TITLE links */

    const generateTitleLinks = function(customSelector = '') {

        const listedArticlesWithCustomSelector = document.querySelectorAll(articleSelector + customSelector);

        /* [DONE] remove contents of titleList */

        const selectTitleList = document.querySelector(titleListSelector);

        selectTitleList.innerHTML = '';
      
        /* [DONE] for each article */

        for(let article of listedArticlesWithCustomSelector){
            
            /* [DONE] get the article id */

            const getArticleId = article.getAttribute("id");
        
            /* [DONE] find the title element */   
            /* [DONE] get the title from the title element */

            const getTitleName = article.querySelector(titleSelector).innerHTML;
        
            /* [DONE] create HTML of the link */

            const linkHTML = '<li><a class="article-list" href="#' + getArticleId + '"><span>' + getTitleName + '</span></a></li>';

            /* [DONE] insert link into titleList */

            selectTitleList.insertAdjacentHTML('beforeend', linkHTML);

            /* [DONE] using titleClickHandler function - showing right specific article after click on article list */

            const links = document.querySelectorAll('.titles a');
    
            for(let link of links){
                link.addEventListener('click', titleClickHandler);
            }
        }   
        
        const firstActiveTag = document.querySelector('.titles a');
        firstActiveTag.classList.add('active'); 
    }   
    
    generateTitleLinks();

    /* FUNCTION THAT GENERATES TAGS FOR ARTICLES */

    const generateTags = function (){

        /* [DONE] START LOOP: for every article: */

        for(let article of listedArticles){
        
            /* [DONE] find tags wrapper */
        
            const tagsWrapper = article.querySelector(articleTagsSelector);

            /* [DONE] make html variable with empty string */

            let html = '';
        
            /* [DONE] get tags from data-tags attribute */

            const getTagsNames = article.getAttribute('data-tags');
        
            /* [DONE] split tags into array */

            const articleTagsArray = getTagsNames.split(' ');
        
            /* [DONE] START LOOP: for each tag */

                for(let tag of articleTagsArray){
                
                /* [DONE] generate HTML of the link */

                const linkTagHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

                /* [DONE] add generated code to html variable */

                html = html + linkTagHtml;
            }

            /* [DONE] insert HTML of all the links into the tags wrapper */
        
            tagsWrapper.innerHTML = html;
        }
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
      
            const tagsEqualWithHref = document.querySelectorAll('a[href="' + href + '"]');

        /* LOOP: for each found tag link add class active */
      
        for(let tagEqual of tagsEqualWithHref){
            tagEqual.classList.add('active');
        }
      
        /* execute function "generateTitleLinks" with article selector as argument */

        generateTitleLinks('[data-tags~="' + tag + '"]');
    }

    function addClickListenersToTags(){
        /* find all links to tags */

        const tags = document.querySelectorAll('.post-tags a');

        /* START LOOP: for each link && add tagClickHandler as event listener for that link && END LOOP: for each link */
      
        for(let tag of tags){
            tag.addEventListener('click', tagClickHandler);
        }
    }
      
    addClickListenersToTags();

    /* FUNCTION THAT GENERATES AUTHOR NAMES UNDERNEATH ARTICLE TITLE */
      
    const generateAuthors = function(){

        /* [DONE] start loop for every article */

        for(let article of listedArticles){
            
            /* [DONE] find wrapper for authors name */

            const selectAllAuthors = article.querySelector(authorNameSelector);

            /* [DONE] make html variable with "by" string */

            let html = 'by ';

            /* [DONE] get data-author attribute from article data-author property */

            const getDataAuthorContent = article.getAttribute('data-author');

            /* [DONE] create proper html syntax */
        
            const authorHtml = '<a href="#author-' + getDataAuthorContent + '">' + getDataAuthorContent + '</a>'

            /* [DONE] add generated html to variable */
            
            html = html + authorHtml;

            /* [DONE] insert html variable to wrapper for authors name */

            selectAllAuthors.innerHTML = html;
        }
    }

    generateAuthors();

    const authorClickHandler = function(event){

        event.preventDefault();

        const clickedElement = this;

        const clickedElementId = clickedElement.getAttribute('href');

        const authorHashReplace = clickedElementId.replace('#author-', '');

        const allActiveAuthors = document.querySelectorAll('a.active[href^="#author-"]');

        for (let activeAuthor of allActiveAuthors) {
            activeAuthor.classList.remove('active');
        }

        const authorsWithHrefEqual = document.querySelectorAll('a[href="' + clickedElementId + '"]');

        for (let authorEqual of authorsWithHrefEqual) {
            authorEqual.classList.add('active');
        }

        generateTitleLinks('[data-author = "' + authorHashReplace + '"]');

    }

    function addClickListenersToAuthors(){

        const authors = document.querySelectorAll('.post-author a')

        for(let author of authors){
            author.addEventListener('click', authorClickHandler);
        }
    }

    addClickListenersToAuthors();
}


    
    