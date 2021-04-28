'use strict'; 
{
    const articleSelector = '.post';
    const titleSelector = '.post-title';
    const titleListSelector = '.titles';
    const articleTagsSelector = ".post-tags .list";
    const listedArticles = document.querySelectorAll(articleSelector);
    
        /* function which shows specific article after clicking on article list */

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

    /* function that generates title links */

    const generateTitleLinks = function (){

        /* [DONE] remove contents of titleList */

        const selectTitleList = document.querySelector(titleListSelector);

        selectTitleList.innerHTML = '';
      
        /* [DONE] for each article */

        for(let article of listedArticles){
            
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


    function generateTags(){

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
        console.log(articleTagsArray);
    
        /* [DONE] START LOOP: for each tag */

        for(let tag of articleTagsArray){
            
            /* [DONE] generate HTML of the link */

            const linkTagHtml = '<li><a href="#tag-' + tag +'">' + tag + '</a></li>';

            /* [DONE] add generated code to html variable */

            html = html + linkTagHtml;
        }

        /* [DONE] insert HTML of all the links into the tags wrapper */
    
        tagsWrapper.innerHTML = html;
        }
    }
    
    generateTags();

}