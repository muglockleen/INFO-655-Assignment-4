import React from 'react';
import { act, render, screen } from '@testing-library/react'
import Podcast from './Podcast';
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

describe('Podcast component', function() {
  
  describe('renders', function() {

    const cannedPodcasts = [
      {
        seasonNum: 42,
        seasonStr: '42',
        episodeNum: 13,
        episodeStr: '13',
        episodeTitle: 'This Old Hovel',
        yearNum: 2025,
        yearStr: '2025'
      }
    ]

    it('episode title', function() {
      act(() => {
        render(<Podcast season={cannedPodcasts[0].seasonNum} episode={cannedPodcasts[0].episodeNum} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='false' />, container)
      });
      const textElement = screen.getByText(/Podcast: This Old Hovel/i);
      expect(textElement).toBeInTheDocument();
    });

    it('podcast as being selected when it is selected', function() {
      act(() => {
        render(<Podcast season={cannedPodcasts[0].seasonNum} episode={cannedPodcasts[0].episodeNum} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='true' />, container)
      });
      const textElement = screen.getByText(/\* Podcast: This Old Hovel/i);
      expect(textElement).toBeInTheDocument();
    });

    it('podcast as not being selected when it is not selected', function() {
      act(() => {
        render(<Podcast season={cannedPodcasts[0].seasonNum} episode={cannedPodcasts[0].episodeNum} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='false' />, container)
      });
      const textElement = screen.getByText(/\* Podcast: This Old Hovel/i);
      !expect(textElement).toBeInTheDocument();
    });

    describe('podcast episode', function() {
      it('when episode is a number', function() {
        act(() => {
          render(<Podcast season={cannedPodcasts[0].seasonNum} episode={cannedPodcasts[0].episodeNum} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='false' />, container)
        });
        const textElement = screen.getByText(/Season: #42 | Episode: #13 | Year: 2025/i);
        expect(textElement).toBeInTheDocument();
      });

      it('when episode is a string', function() {
        act(() => {
          render(<Podcast season={cannedPodcasts[0].seasonNum} episode={cannedPodcasts[0].episodeStr} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='false' />, container)
        });
        const textElement = screen.getByText(/Season: #42 | Episode: #13 | Year: 2025/i);
        expect(textElement).toBeInTheDocument();
      });

      it('when episode is a provided', function() {
        act(() => {
          render(<Podcast season={cannedPodcasts[0].seasonNum} episode={cannedPodcasts[0].episodeNum} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='false' />, container)
        });
        const textElement = screen.getByText(/Season: #42 | Episode: #13 | Year: 2025/i);
        expect(textElement).toBeInTheDocument();
      });

      it('when episode is not provided', function() {
        act(() => {
          render(<Podcast season={cannedPodcasts[0].seasonNum} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='false' />, container)
        });
        const textElement = screen.getByText(/Season: #13 | Episode: #\?\?\? | Year: 2025/i);
        expect(textElement).toBeInTheDocument();
      });
    });

    describe('podcast season', function() {
      it('when season is a provided', function() {
        act(() => {
          render(<Podcast season={cannedPodcasts[0].seasonNum} episode={cannedPodcasts[0].episodeNum} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='false' />, container)
        });
        const textElement = screen.getByText(/Season: #42 | Episode: #13 | Year: 2025/i);
        expect(textElement).toBeInTheDocument();
      });

      it('when season is not provided', function() {
        act(() => {
          render(<Podcast episode={cannedPodcasts[0].episodeNum} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='false' />, container)
        });
        const textElement = screen.getByText(/Episode: #13 | Year: 2025/i);
        const excludedElement = screen.queryByText(/Season: /i);
        expect(textElement).toBeInTheDocument();
        expect(excludedElement).not.toBeInTheDocument();
      });

      it('when season is a number', function() {
        act(() => {
          render(<Podcast season={cannedPodcasts[0].seasonNum} episode={cannedPodcasts[0].episode} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='false' />, container)
        });
        const textElement = screen.getByText(/Season: #42 | Episode: #13 | Year: 2025/i);
        expect(textElement).toBeInTheDocument();
      });

      it('when season is a string', function() {
        act(() => {
          render(<Podcast season={cannedPodcasts[0].seasonStr} episode={cannedPodcasts[0].episode} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='false' />, container)
        });
        const textElement = screen.getByText(/Season: #42 | Episode: #13 | Year: 2025/i);
        expect(textElement).toBeInTheDocument();
      });
    });

    describe('podcast year', function() {
      it('when year is a number', function() {
        act(() => {
          render(<Podcast season={cannedPodcasts[0].seasonNum} episode={cannedPodcasts[0].episode} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='false' />, container)
        });
        const textElement = screen.getByText(/Season: #42 | Episode: #13 | Year: 2025/i);
        expect(textElement).toBeInTheDocument();
      });

      it('when year is a string', function() {
        act(() => {
          render(<Podcast season={cannedPodcasts[0].seasonNum} episode={cannedPodcasts[0].episode} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearStr} isSelected='false' />, container)
        });
        const textElement = screen.getByText(/Season: #42 | Episode: #13 | Year: 2025/i);
        expect(textElement).toBeInTheDocument();
      });

      it('when year is a provided', function() {
        act(() => {
          render(<Podcast season={cannedPodcasts[0].seasonNum} episode={cannedPodcasts[0].episodeNum} episodeTitle={cannedPodcasts[0].episodeTitle} year={cannedPodcasts[0].yearNum} isSelected='false' />, container)
        });
        const textElement = screen.getByText(/Season: #42 | Episode: #13 | Year: 2025/i);
        expect(textElement).toBeInTheDocument();
      });

      it('when year is not provided', function() {
        act(() => {
          render(<Podcast season={cannedPodcasts[0].seasonNum} episode={cannedPodcasts[0].episodeNum} episodeTitle={cannedPodcasts[0].episodeTitle} isSelected='false' />, container)
        });
        const textElement = screen.getByText(/Season: #42 | Episode: #13/i);
        const excludedElement = screen.queryByText(/Year: /i);
        expect(textElement).toBeInTheDocument();
        expect(excludedElement).not.toBeInTheDocument();
      });
    });
  });
});
