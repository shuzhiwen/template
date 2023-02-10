import ReactDOM from 'react-dom'
import React, {Suspense} from 'react'
import {Switch, Route} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import {Box} from '@mui/system'
import {Entry} from './pages'
import './index.css'

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Switch>
          <Suspense fallback={<div className="m-center">加载中...</div>}>
            <Route exact path="/" component={Entry} />
          </Suspense>
        </Switch>
      </BrowserRouter>
    </Box>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
