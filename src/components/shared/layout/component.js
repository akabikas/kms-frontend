import React from 'react'
import SideMenuBar from '../sidemenu/component';

function Layout({MenuData, children}) {
  return (
    <section className="grid grid-cols-24">
      <SideMenuBar links={MenuData} />
      <section className="col-span-19 py-6 px-20">
            {children}
      </section>
    </section>
  )
}

export default Layout;