import React from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ title, author, url, handleSubmit, handleTitleChange, handleAuthorChange, handleUrlChange }) => {

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
       title
          <input
            id='title'
            type="text"
            value={title}
            name=""
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
       author
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            required
          />
        </div>
        <div>
       url
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
            required
          />
        </div>
        <button type="submit" variant="primary" >create</button>
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default CreateBlog
