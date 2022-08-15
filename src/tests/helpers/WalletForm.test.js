import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';

import Wallet from '../../pages/Wallet';
import mockData from '../helpers/mockData';

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
    
    it('Testa se tem o botão adicionar despesa e excluir', () => {
        renderWithRouterAndRedux(<Wallet />);

        const inputValue = screen.getByTestId("value-input");
        const buttonAddExpense = screen.getByRole('button', { name: /adicionar despesa/i});
        
        userEvent.type(inputValue, '50');
        userEvent.click(buttonAddExpense);

        const buttonDelete = screen.getByTestId("delete-btn");

        userEvent.click(buttonDelete);
        expect(buttonDelete).not.toBeInTheDocument();
    })

    it('Testa se aparece o total no header', () => {
        renderWithRouterAndRedux(<Wallet />);

        const totalField = screen.getByTestId('total-field');
        
        expect(totalField).toBeInTheDocument();
    })

    // mockResolvedValue
    // https://cursos.alura.com.br/forum/topico-nao-entendi-o-uso-do-mockresolvedvalue-164108
    it('Testa se é renderizado itens adc', async () => {
        fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData)
        });
        renderWithRouterAndRedux(<Wallet />);

        const inputValue = screen.getByTestId("value-input");
        const buttonAddExpense = screen.getByRole('button', { name: /adicionar despesa/i});
        
        userEvent.type(inputValue, '50');
        userEvent.click(buttonAddExpense);

        const buttonDelete = screen.getByTestId("delete-btn");

        userEvent.click(buttonDelete);
        expect(buttonDelete).not.toBeInTheDocument();

        await waitFor(() => expect(fetch).toBeCalledTimes());
    })

})