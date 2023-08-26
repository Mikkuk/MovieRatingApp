import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ReviewForm from './ReviewForm'
import userEvent from '@testing-library/user-event'

it('when review is created, callback has correct data', () => {
    const onCreate = jest.fn()
    render(<ReviewForm onCreate={onCreate} />)

    const reviewToCreate = {
        author: 'tester',
        title: 'Testreview',
        body: 'testbody',
    }

    const authorInput = screen.getByPlaceholderText('')
    userEvent.type(authorInput, reviewToCreate.author)

    const titleInput = screen.getByPlaceholderText('')
    userEvent.type(titleInput, reviewToCreate.title)

    const urlInput = screen.getByPlaceholderText('')
    userEvent.type(urlInput, reviewToCreate.url)

    const createButton = screen.getByText('new review')
    userEvent.click(createButton)

    expect(onCreate.mock.calls[0][0]).toEqual(reviewToCreate)
})
