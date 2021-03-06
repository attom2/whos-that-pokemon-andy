import React from 'react';
import Header from './Header';
import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('should render header text', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const linkElement = getByText(/Who's That Pokémon?/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should render buttons for a game and pokedex', () => {
    const { getByText } = render(
      <MemoryRouter><Header /></MemoryRouter>
    );
    const button1 = getByText('Pokedex');
    const button2 = getByText('Game');

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });
});