import { renderHook } from '@testing-library/react-hooks';
import { nanoid } from 'nanoid';

import { useCssVar } from './use-css-var';
import { setVar, removeVar } from './vars';

jest.mock('nanoid');
jest.mock('./vars');

const mockedNanoId = nanoid as jest.Mock;
mockedNanoId.mockReturnValueOnce('12345678').mockReturnValueOnce('87654321');

const mockedSetVar = setVar as jest.Mock;
const mockedRemoveVar = removeVar as jest.Mock;

describe('useCssVar', () => {
  beforeEach(() => {
    mockedNanoId.mockClear();
    mockedSetVar.mockClear();
    mockedRemoveVar.mockClear();
  });

  it('sets a var, updates a var and removes a var on unmount', () => {
    const { result, rerender, unmount } = renderHook(useCssVar, {
      initialProps: '10px',
    });

    expect(result.current).toBe('12345678');
    expect(mockedSetVar).toBeCalledTimes(1);
    expect(mockedSetVar).toBeCalledWith('12345678', '10px');
    expect(mockedRemoveVar).not.toHaveBeenCalled();

    mockedSetVar.mockClear();
    mockedRemoveVar.mockClear();

    rerender('20px');
    expect(result.current).toBe('12345678');
    expect(mockedSetVar).toBeCalledTimes(1);
    expect(mockedSetVar).toBeCalledWith('12345678', '20px');
    expect(mockedRemoveVar).not.toHaveBeenCalled();

    mockedSetVar.mockClear();
    mockedRemoveVar.mockClear();

    unmount();
    expect(mockedSetVar).not.toHaveBeenCalled();
    expect(mockedRemoveVar).toBeCalledTimes(1);
    expect(mockedRemoveVar).toBeCalledWith('12345678');
  });
});
