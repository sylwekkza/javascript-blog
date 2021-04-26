'use strict'; 
{
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

        const articleSelector = clickedElement.getAttribute("href");

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */

        targetArticle.classList.add('active');

        const articles = '.posts article.active';
        let articleSelection = document.querySelectorAll(articles);
        console.log(articleSelection);
     }

    /* function that generates title links */

    const generateTitleLinks = function (){
        const articleSelector = '.post';
        const titleSelector = '.post-title';
        const titleListSelector = '.titles';

        /* [DONE] remove contents of titleList */

        const selectTitleList = document.querySelector(titleListSelector);

        selectTitleList.innerHTML = '';
      
        /* [DONE] for each article */

        const listedArticles = document.querySelectorAll(articleSelector);

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
            const firstActiveTag = document.querySelector('.titles a');
            firstActiveTag.classList.add('active');
    
            for(let link of links){
                link.addEventListener('click', titleClickHandler);
            }
        }   
    }
    
    generateTitleLinks();
}