import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';

import App from '../../App';

describe('Teste na pagina de login', () => {
    it('testa se o componente é renderizado', () => {
        renderWithRouterAndRedux(<App />);

        const emailLabel = screen.getByText(/email/i)
        const senhaLabel = screen.getByText(/senha/i)
        expect(emailLabel).toBeInTheDocument();
        expect(senhaLabel).toBeInTheDocument();

        const emailImput = screen.getByTestId("email-input")
        const senhaImput = screen.getByTestId("password-input")
        expect(emailImput).toBeInTheDocument();
        expect(senhaImput).toBeInTheDocument();
    });

    it('Testa se o botão é renderizado pra carteira', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        
        const emailImput = screen.getByTestId("email-input")
        const senhaImput = screen.getByTestId("password-input")
        const button = screen.getByRole('button', {
            name: /entrar/i,
        })

        userEvent.type(emailImput, 'email@teste.com')
        userEvent.type(senhaImput, '123456')
        userEvent.click(button);

        const { pathname } = history.location;

        expect(pathname).toBe('/carteira');

    })
    
    it('Testa de o botão esta desativado', () => {
        renderWithRouterAndRedux(<App />)
        const button = screen.getByRole('button', {
            name: /entrar/i,
        })

        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();

    })
})