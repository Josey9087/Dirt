// next page
let nextButton;
let prevButton;
nextButton = document.querySelector('#next-button');
prevButton = document.querySelector('#prev-button');
nextButton.addEventListener('click', paginateUp);
prevButton.addEventListener('click', paginateDown);
let pageNum = 0;

const paginateUp = () => {
    if (pageNum < 100) {
         pageNum += 20;
    }
};

const paginateDown = () => {
    if (pageNum > 0) {
        pageNum -= 20;
    }
};

module.exports = {
    paginateUp,
    paginateDown
};