//the timer
function formatDate(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
}

//goes to a different file
module.exports = {
    formatDate
}