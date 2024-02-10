import Greeting from "./Greeting";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Greeting component', () => {
  test('renders Hello World as a text', () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloworldElement = screen.getByText('Hello World', { exact: false });
    expect(helloworldElement).toBeInTheDocument();
  });

  test('renders It\'s good to see you if the button was Not clicked', () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const paragraphBasetext = screen.getByText('It\'s good to see you');
    expect(paragraphBasetext).toBeInTheDocument();
  });

  test('renders Changed! if the button was clicked', async () => {
    // Arrange
    render(<Greeting />)

    // Act
    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText('Changed!');
    expect(outputElement).toBeInTheDocument();
  });

  test('does not render "good to see you" if the button was clicked', async () => {
    // Arrange
    render(<Greeting />)

    // Act
    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.queryByText('good to see you', { exact: false});
    expect(outputElement).toBeNull();
  });

})