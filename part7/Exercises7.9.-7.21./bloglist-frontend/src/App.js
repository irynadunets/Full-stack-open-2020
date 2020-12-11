import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import Notificatin from './components/Notificatin'
import blogService from './services/blogs'
import './App.css'
import {
  BrowserRouter as Router, useRouteMatch,
  Switch, Route, Link, Redirect
} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { initializeBlogs } from './reducers/reducer'
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [Message, setMessage] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const padding = {
    padding: 5
  }

  const login = (user) => {
    setUser(user)
  }

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
        blogs.concat(data)
      })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const Login = () => (
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
        <button type="submit" variant="primary" >login</button>
      </form>
    </div>
  )

  const Blogs = () => (
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
        <Blog blogs={blogs} key={blog.id} blog={blog} />
      )}
    </div>
  )

  const Home = () => (
    <div>
      <h2>HOME</h2>
    </div>
  )



  let blogs = useSelector(state => state.blogs.sort())[0]
  console.log(blogs)

  let blog = ''
  const match = useRouteMatch('/blogs/:id')
  if(blogs) {
    blog = match ? blogs.find(blog => blog.id === match.params.id) : null
  }

  const Users = () => (
    <div>
      <h2>{username}</h2>
    </div>
  )

  return (
    <div className="container">
      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">home</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/blogs">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  {user
                    ? <em>{user} logged in</em>
                    : <Link style={padding} to="/login">login</Link>
                  }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <Switch>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} blog={blog} />
          </Route>
          <Route path="/blogs">
            {user ? <Blogs blogs={blogs} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/users">
            {user ? <Users /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Login onLogin={login}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <div>
        <br />
        <em>Blogs app, 2020</em>
      </div>
    </div>
  )
}

export default App
