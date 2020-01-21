import React from 'react';
import { Link } from 'react-router-dom';

import { Regions } from './people';
import { Heading } from 'components/heading';
import './__styles__/home.scss';

const SeeAll = ({ region }) => <Link to={`/people?region=${region}`}>See All</Link>;
const Dashboard = () => {
  return (
    <section className="home">
      <section className="western">
        <div className="headers">
          <Heading title="Western" />
          <SeeAll region="western" />
        </div>
        <Regions region="western" />
      </section>
      <section className="eastern">
        <div className="headers">
          <Heading title="Eastern" />
          <SeeAll region="eastern" />
        </div>
        <Regions region="eastern" />
      </section>
      <section className="northern">
        <div className="headers">
          <Heading title="Northern" />
          <SeeAll region="northern" />
        </div>
        <Regions region="northern" />
      </section>
      <section className="central">
        <div className="headers">
          <Heading title="Central" />
          <SeeAll region="central" />
        </div>
        <Regions region="central" />
      </section>
      <section className="southern">
        <div className="headers">
          <Heading title="Southern" />
          <SeeAll region="southern" />
        </div>
        <Regions region="southern" />
      </section>
    </section>
  );
};

export { Dashboard };
