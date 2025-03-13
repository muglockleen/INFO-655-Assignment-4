import React from 'react';
import { act, render, screen } from '@testing-library/react'
import Song from 'Song'

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

test("renders", () => {
  act(() => {render(<Song />, container)})
  expect(container.textContent).toContain("Year:")
  act(() => {
    render(<Song title="Some Song" />, container)
  });
});
