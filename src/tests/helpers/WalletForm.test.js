import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';

import Wallet from '../../pages/Wallet';

describe('Teste de formulario', () => {
    it('testa se o campo de formulario é renderizado', () => {
        renderWithRouterAndRedux(<Wallet />);

        const valueImput = screen.getByTestId("value-input")
        const descriptionInput = screen.getByTestId("description-input")
        const currencyInput = screen.getByTestId("currency-input")
        const methodInput = screen.getByTestId("method-input")
        const tagInput = screen.getByTestId("tag-input")

        expect(valueImput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(currencyInput).toBeInTheDocument();
        expect(methodInput).toBeInTheDocument();
        expect(tagInput).toBeInTheDocument();
    })
})