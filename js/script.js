'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function titleClickHandler() {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.title a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.post');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  const articleSelector = clickedElement.getAttribute('href');
  const targerArticle = document.querySelector(articleSelector);
  targerArticle.classList.add('active');
}

function generateTitleLinks(customSelector = ' ') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"<span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
    titleList.innerHTML = html;
  }
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    let tag = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (tag of articleTagsArray) {
      const linkHTML = '<li><a href="#' + tag + '">' + tag + '</a></li> ';
      html = html + linkHTML;
    }
    tagWrapper.innerHTML = html;
  }
}

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#', '');
  const activeTagLinks = document.querySelectorAll('a.active[href^="#"]');
  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove('active');
  }
  const sameTags = document.querySelectorAll('a[href="' + href + '"]');
  for (let sameTag of sameTags) {
    sameTag.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const linkTags = document.querySelectorAll('.post-tags .list a');
  for (let linkTag of linkTags) {
    linkTag.addEventListener('click', tagClickHandler);
  }
}
generateTags();
addClickListenersToTags();
generateTitleLinks();
