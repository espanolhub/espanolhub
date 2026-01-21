'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const SuccessMoment = dynamic(() => import('./SuccessMoment'), { ssr: false });

export default function SuccessMomentClient() {
  return <SuccessMoment />;
}

