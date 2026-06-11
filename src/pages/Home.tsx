import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Industries from '../components/Industries';
import ManagementSystems from '../components/ManagementSystems';
import InHouseApp from '../components/InHouseApp';
import ValuesCulture from '../components/ValuesCulture';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Industries />
      <ManagementSystems />
      <InHouseApp />
      <ValuesCulture />
    </>
  );
}
