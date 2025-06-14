"use client";
import PageLoadingSpinner from '@/components/common/spinners/pageLoadingSpinner';
import Agents from '@/components/dashboard/agents';

import { Suspense } from 'react';

const AgentsPage = () => {
  return (
          <Suspense fallback={<PageLoadingSpinner />}>
                <Agents />
                </Suspense>
  )
}

export default AgentsPage;
