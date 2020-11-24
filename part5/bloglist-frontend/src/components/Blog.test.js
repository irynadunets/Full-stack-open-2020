import React, { useState, useEffect } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Togglable from './Togglable'

test('test which checks that the component displaying a blog renders the blog title and author, but does not render its url or number of likes by default', () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Alex',
    url: 'hhtp?:',
    likes: 4
  }
  const component = render(
    <Blog blog={ blog } />
  )
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Alex'
  )
  const url = component.container.querySelector('p:nth-child(3)')
  const likes = component.container.querySelector('p:nth-child(4)')
  expect(url).not.toBeInTheDocument()
  expect(likes).not.toBeInTheDocument()
})

test('test which checks that the blog url and number of likes are shown when the button controlling the shown details has been clicked.', () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Alex',
    url: 'hhtp?:',
    likes: 4
  }
  const component = render(
    <Blog blog={ blog } />
  )
  const togglable = render(
    <Togglable />
  )
  const clickable = togglable.container.querySelector('button')
  fireEvent.click(clickable)
  expect(component.container).toHaveTextContent(
    'hhtp?:'
  )
  expect(component.container).toHaveTextContent(
    4
  )
})

test('only the name and author of the blog post are shown when the post is clicked 2 times', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Alex',
    url: 'hhtp?:',
    likes: 4
  }
  const component = render(
    <Blog blog={ blog } />
  )
  const togglable = render(
    <Togglable />
  )
  const clickable = togglable.container.querySelector('button')
  fireEvent.click(clickable)
  expect(component.container).toHaveTextContent(
    'hhtp?:'
  )
  expect(component.container).toHaveTextContent(
    4
  )
  fireEvent.click(clickable)
  const url = component.container.querySelector('p:nth-child(3)')
  const likes = component.container.querySelector('p:nth-child(4)')
  expect(url).not.toBeInTheDocument()
  expect(likes).not.toBeInTheDocument()
  })
