import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUserName } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }
  // validação do email
  // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

  isButtonDisabled = () => {
    const { email, password } = this.state;
    const check = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
    const minNumber = 6;
    if (check.test(email) && password.length >= minNumber) {
      return this.setState({ disabled: false });
    }
    return this.setState({ disabled: true });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.isButtonDisabled();
    });
  };

  handleSubmit = (event) => {
    const { history, dispatchUserName } = this.props;
    const { email } = this.state;
    event.preventDefault();
    dispatchUserName(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <babel htmlFor="login-email" id="email-label">
            Email
          </babel>
          <input
            type="email"
            id="login-email"
            name="email"
            value={ email }
            placeholder="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <babel htmlFor="login-senha" id="senha-label">
            Senha
          </babel>
          <input
            type="password"
            id="login-senha"
            name="password"
            value={ password }
            placeholder="senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ disabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserName: (email) => dispatch(setUserName(email)),
});

Login.propTypes = {
  dispatchUserName: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
