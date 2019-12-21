An example of using React Context with a component:

```jsx
import ThemeContext from '../../ThemeContext.js'

const [theme, setTheme] = React.useState('light')
const toggleTheme = () =>
  setTheme(theme === 'light' ? 'dark' : 'light')
;<>
  <div
    style={{
      backgroundColor: '#ccc',
      margin: '-16px -16px 16px -16px',
      padding: '16px'
    }}
  >
    <button onClick={toggleTheme}>Theme: {theme}</button>
  </div>
  <div>
    <ThemeContext.Provider value={theme}>
      <ThemeButton>Themable button</ThemeButton>
    </ThemeContext.Provider>
  </div>
</>
```
