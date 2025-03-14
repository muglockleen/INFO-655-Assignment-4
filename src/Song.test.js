import React from 'react';
import { act, render, screen } from '@testing-library/react'
import Song from './Song';
import '@testing-library/jest-dom'

let container = null
beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  // TODO(MPM): This function does not exist anymore as of React v19
//  unmountComponentAtNode(container)
  container.remove()
  container = null
})

describe('Song component', function() {
  
  describe('renders', function() {

    const cannedSongs = [
      {
        title: 'Some New Song',
        artist: 'Some Old Artist',
        yearNum: 2025,
        yearStr: '2025',
        genre: 'Oldies'
      }
    ]

    it('song title and artist', function() {
      act(() => {
        render(<Song title={cannedSongs[0].title} artist={cannedSongs[0].artist} year={cannedSongs[0].yearNum} isSelected="false" />, container)
      });
      const textElement = screen.getByText(/Some Old Artist: Some New Song/i);
      expect(textElement).toBeInTheDocument();
    });

    it('song as being selected when song is selected', function() {
      act(() => {
        render(<Song title={cannedSongs[0].title} artist={cannedSongs[0].artist} year={cannedSongs[0].yearNum} isSelected="true" />, container)
      });
      const textElement = screen.getByText(/\* Some Old Artist: Some New Song/i);
      expect(textElement).toBeInTheDocument();
    });

    it('song as not being selected when song is not selected', function() {
      act(() => {
        render(<Song title={cannedSongs[0].title} artist={cannedSongs[0].artist} year={cannedSongs[0].yearNum} isSelected="false" />, container)
      });
      const textElement = screen.getByText(/\* Some Old Artist: Some New Song/i);
      !(expect(textElement).toBeInTheDocument());
    });

    describe('song year', function() {
      it('when year is a number', function() {
        act(() => {
          render(<Song title={cannedSongs[0].title} artist={cannedSongs[0].artist} year={cannedSongs[0].yearNum} isSelected="false" />, container)
        });
        const textElement = screen.getByText(/Year: 2025/i);
        expect(textElement).toBeInTheDocument();
      });

      it('when year is a string', function() {
        act(() => {
          render(<Song title={cannedSongs[0].title} artist={cannedSongs[0].artist} year={cannedSongs[0].yearStr} isSelected="false" />, container)
        });
        const textElement = screen.getByText(/Year: 2025/i);
        expect(textElement).toBeInTheDocument();
      });

      it('when genre is a provided', function() {
        act(() => {
          render(<Song title={cannedSongs[0].title} artist={cannedSongs[0].artist} year={cannedSongs[0].yearNum} genre={cannedSongs[0].genre} isSelected="false" />, container)
        });
        const textElement = screen.getByText(/Genre: Oldies/i);
        expect(textElement).toBeInTheDocument();
      });
      
      it('when genre is not provided', function() {
        act(() => {
          render(<Song title={cannedSongs[0].title} artist={cannedSongs[0].artist} year={cannedSongs[0].yearNum} isSelected="false" />, container)
        });
        const textElement = screen.getByText(/Year: 2025/i);
        const excludedElement = screen.queryByText(/Genre: /i);
        expect(textElement).toBeInTheDocument();
        expect(excludedElement).not.toBeInTheDocument();
      });
    });
  });
});
