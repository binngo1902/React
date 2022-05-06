import React from 'react'
import {Routes,Route} from 'react-router-dom'
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'


import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

import routes from '../../routes/routes'

const MasterLayout = () => {
  return (
    <div className="sb-nav-fixed">
        <Navbar/>
        <div id="layoutSidenav">

            <div id="layoutSidenav_nav">
              <Sidebar/>
            </div>

            <div id="layoutSidenav_content">
                <main>
                  <Routes>
                    {routes.map( (route,idx) => {
                      return(
                        route.element && (
                          <Route 
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            element={route.element}
                          />
                        )
                      )
                    })}
                  </Routes>
                </main>
                <Footer/>
            </div>
        </div>
    </div>
  )
}

export default MasterLayout