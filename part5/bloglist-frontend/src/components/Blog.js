import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleAddLike = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    blogService
      .update(blog.id, blogObject)
      .then(data => {
        blogs = blogs.filter(bl => bl.title!==blog.title)
        setBlogs(blogs.concat(data))
      })
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          blogs = blogs.filter(bl => bl.id!==blog.id)
          setBlogs(blogs)
        })
    }
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <Togglable buttonLabel="view">
        <p>{blog.url}</p>
        <p>{blog.likes}<button onClick={handleAddLike}>like</button></p>
        <button onClick={handleDelete}>Delete</button>
      </Togglable>
    </div>
  )}

export default Blog
