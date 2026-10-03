const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    console.log(`sum: ${sum} item: ${item.likes}`);
    return sum + item.likes;
  };

  //console.log(`likes: ${blogs[0].likes}`);
  //console.log(blogs.reduce(reducer,0));
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  console.log(Math.max(...blogs.map((blog) => blog.likes)));
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));

  return blogs.find((blog) => blog.likes === maxLikes);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorCount = _.countBy(blogs, "author");
  console.log(authorCount);

  const authorArray = _.map(authorCount, (count, author) => ({
    author: author,
    blogs: count,
  }));

  return _.maxBy(authorArray, "blogs");
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
};
