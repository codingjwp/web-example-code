import { render, screen  } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
  test('renders posts if request succeds', async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post'}]
    });
    render(<Async />)

    // const listItemElements =  screen.getAllByRole('listitem');  // 즉시 screen의 요소를 찾기 때문에 [] 빈배열로 인해 에러 발생합니다.
    const listItemElements = await screen.findAllByRole('listitem'); // 디폴트 1초로 1초 동안 해당 screen 내용이 있는지 찾아봅니다.
    expect(listItemElements).not.toHaveLength(0);
  })
})