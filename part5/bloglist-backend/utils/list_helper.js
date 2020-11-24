var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => blogs.reduce(function (sum, blog) {
  return sum + blog.likes
}, 0)

const favoriteBlog = (blogs) =>{
  const max = blogs.reduce(function(prev, current) {
    return (prev.likes > current.likes) ? prev : current
})
return max
}

const mostLikes = (blogs) => blogs.reduce(({total, max}, {likes, author}) => {
    total[author] = likes = (total[author] || 0) + likes;
    if (likes > max.likes) max = {author,likes};
    return {total,max};
  },
  {total: {}, max: {likes:0} }).max;

const mostBlogs = (arr) => arr.reduce(({total, max}, {blogs, author}) => {
    total[author] = blogs = (total[author] || 0) + 1;
    if (blogs > max.blogs) max = {author,blogs};
    return {total,max};
  },
  {total: {}, max: {blogs: 0} }).max;

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
