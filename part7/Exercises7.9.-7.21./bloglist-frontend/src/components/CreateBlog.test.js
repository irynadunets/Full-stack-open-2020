import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import CreateBlog from './CreateBlog'

test('test should check, that the form calls the event handler it received as props with the right details when a new blog is created', () => {
  const title = 'Component testing is done with react-testing-library'
  const author = 'Alex'
  const url = 'hhtp?:'

  let mockHandler = jest.fn()

  const component = render(
    <CreateBlog title={title} author={author} url={url} handleSubmit={mockHandler}/>
  )

  expect(component.container).toHaveTextContent(
    'create newtitleauthorurlcreate'
  )

})
