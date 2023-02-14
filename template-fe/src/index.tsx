import ReactDOM from 'react-dom'
import React, {Suspense} from 'react'
import {Switch, Route} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import {ApolloProvider} from './context/apollo'
import {Entry} from './pages'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider>
      <BrowserRouter>
        <Switch>
          <Suspense fallback={<div className="m-center">加载中...</div>}>
            <Route exact path="/" component={Entry} />
          </Suspense>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
