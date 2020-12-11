import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Blog = ({ blog, blogs }) => {
  const [comment, setComment] = useState(null)

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
        blogs.concat(data)
      })
  }

  const handleCommit = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      comments: blog.comments.concat(comment)
    }
    console.log(blogObject)
    blogService
      .update(blog.id, blogObject)
      .then(data => {
        blogs = blogs.filter(bl => bl.title!==data.title)
        blogs.concat(data)
      })

  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          blogs = blogs.filter(bl => bl.id!==blog.id)
        })
    }
  }

  return (
    <div style={blogStyle}>
      <p>{blog.id}</p>
      <p><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
      <p>{blog.author}</p>
      <Togglable buttonLabel="view">
        <p>{blog.url}</p>
        <p>{blog.likes}<button onClick={handleAddLike}>like</button></p>
        <h4>Comments</h4>
        {blog.comments ? blog.comments.map(comment =>
          <p>{comment}</p>
        ) : null}
        <input
          type="text"
          value={comment}
          name="Username"
          onChange={({ target }) => setComment(target.value)}
          required
        />
        <button type="submit" variant="primary" onClick={handleCommit}>Add comment</button>
        <p></p>
        <button onClick={handleDelete}>Delete</button>
      </Togglable>
    </div>
  )}

export default Blog
