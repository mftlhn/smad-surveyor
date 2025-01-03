
import React from 'react'
import CardDetailOrder from './_components/CardDetailOrder'
import Header from '@/components/Header'
import BottomNavBar from '@/components/BottomNavBar'

export default async function DetailOrderPage({ params }) {
  const orderId = (await params).order_id
  
  return (
    <>
      <Header title={'Detail Order'}/>
        <CardDetailOrder params={orderId} />
      <BottomNavBar />
    </>
  )
}

// export default DetailOrderPage