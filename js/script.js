'use strict'; 
{
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

        const articleSelector = clickedElement.getAttribute("href");

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */

        targetArticle.classList.add('active');
    }

    const links = document.querySelectorAll('.titles a');
    
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }

    const articleSelector = '.post';
    const titleSelector = '.post-title';
    const titleListSelector = '.titles';

    function generateTitleLinks(){

        /* [DONE] remove contents of titleList */

        const selectTitleList = document.querySelector(titleListSelector);

        selectTitleList.innerHTML = '';
      
        /* [DONE] for each article */

        const selectArticle = document.querySelectorAll(articleSelector);

        for(let article of selectArticle){
            
            /* [DONE] get the article id */

            const getArticleId = article.getAttribute("id");
            console.log(getArticleId);
        
            /* [DONE] find the title element */   
            /* [DONE] get the title from the title element */

            const getTitleName = article.querySelector(titleSelector).innerHTML;
            console.log(getTitleName);
        
            /* [DONE] create HTML of the link */

            const linkHTML = '<li><a href="#' + getArticleId + '"><span>' + getTitleName + '</span></a></li>';
            console.log(linkHTML);

            /* [DONE] insert link into titleList */

            selectTitleList.innerHTML = selectTitleList.innerHTML + linkHTML;
        }
    }

    generateTitleLinks();
}