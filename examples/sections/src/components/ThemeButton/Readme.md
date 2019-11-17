An example of using React Context with a component:

```jsx
import ThemeContext from '../../ThemeContext.js'

initialState = { theme: 'light' }
const toggleTheme = () => {
  setState({ theme: state.theme === 'light' ? 'dark' : 'light' })
}
;<>
  <div
    style={{
      backgroundColor: '#ccc',
      margin: '-16px -16px 16px -16px',
      padding: '16px'
    }}
  >
    <button onClick={toggleTheme}>Theme: {state.theme}</button>
  </div>
  <div>
    <ThemeContext.Provider value={state.theme}>
      <ThemeButton>Themable button</ThemeButton>
    </ThemeContext.Provider>
  </div>
</>
```
