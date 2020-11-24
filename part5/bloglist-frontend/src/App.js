import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import Notificatin from './components/Notificatin'
import blogService from './services/blogs'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  //const [errorMessage, setErrorMessage] = useState(null)
  const [Message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort())
    )
  }, [])

  useEffect(() => {
    if(localStorage.getItem('login') === username && localStorage.getItem('password') === password) {
      setUser(username)
    }
    setUsername('')
    setPassword('')
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    localStorage.setItem('login', username)
    localStorage.setItem('password', password)
    setUser(username)
    setUsername('')
    setPassword('')
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    localStorage.clear()
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(data => {
        setMessage(`a new blog ${title} by ${author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setBlogs(blogs.concat(data))
      })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
           username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              required
            />
          </div>
          <div>
           password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notificatin message = {Message} />
        <p>{user} logged in<button onClick={handleLogout}>Logout</button></p>
        <Togglable buttonLabel='new blog'>
          <CreateBlog
            title={title} author={author} url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleSubmit={handleAddBlog}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog blogs={blogs} setBlogs={setBlogs} key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App
