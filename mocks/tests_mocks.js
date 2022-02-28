const mockedNavigate = jest.fn();

export const mockNavigation = () => {
  jest.mock("@react-navigation/native", () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: mockedNavigate,
      }),
    };
  });
};
