const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        console.log(`sum: ${sum} item: ${item.likes}`)
        return sum + item.likes;
    }

    //console.log(`likes: ${blogs[0].likes}`);
    //console.log(blogs.reduce(reducer,0));
    return blogs.length === 0 ? 0 : blogs.reduce(reducer,0);
};

module.exports = {
    dummy,
    totalLikes,
}