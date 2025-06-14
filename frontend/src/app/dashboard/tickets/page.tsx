"use client";
import PageLoadingSpinner from '@/components/common/spinners/pageLoadingSpinner';

import Tickets from '@/components/dashboard/tickets';

import { Suspense } from 'react';

const TicketsPage = () => {
  return (
          <Suspense fallback={<PageLoadingSpinner />}>
                <Tickets />
                </Suspense>
  )
}

export default TicketsPage;
