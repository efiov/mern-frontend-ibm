'use client'

import React from 'react'
import Page from './login/page'
import NewEveniment from '@/components/organisms/new_eveniment'

export default function Home() {
  return (
    <main>
      <div>
        {/* <Page /> */}
        <NewEveniment />
      </div>
    </main>
  )
}
