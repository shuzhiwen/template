import {Route} from 'react-router'
import {Suspense, StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Routes} from 'react-router-dom'
import {ApolloProvider, MeProvider} from './context'
import {Entry} from './pages'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeProvider>
      <ApolloProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="m-center">加载中...</div>}>
            <Routes>
              <Route path="/" Component={Entry}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ApolloProvider>
    </MeProvider>
  </StrictMode>
)
