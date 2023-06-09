import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import TodoList from "./components/TodoList";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { isDarkAtom } from "./atom";
import { useRecoilValue } from "recoil";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

*{
  box-sizing: border-box;
}

body{
font-family: 'Source Sans Pro', sans-serif;
background-color: ${(props) => props.theme.bgColor};
color: ${(props) => props.theme.textColor};
}

a{
  text-decoration: none;
  color: inherit;
}

`;
// GlobalStyle을 사용해서 App안에있는 모든 컴포넌트에 요소들에게 일괄 적용

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Reset />
        {/* Reset은 reactReset npm을 사용해서 기본적인 css를 초기화시켜준다 */}
        <TodoList />
      </ThemeProvider>
    </>
  );
}

export default App;
