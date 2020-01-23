import React from 'react';

import './__styles__/index.scss';

const calculateAge = (birthday) => { // birthday is a date
  const ageDifMs = Date.now() - new Date(birthday).getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const Person = ({ person }) => {
  const dob = calculateAge(person.date_of_birth)
  return (
    <div className="person">
      <p className="name">{person.name}</p>
      <div className="personal-info">
        <span className="age">{dob} years old</span>
        <span className="district">{person.district}</span>
      </div>
      <div className="location-specifics">
        <span className="badge badge-info">{person.country}</span>
        <span className="badge badge-success">{person.region}</span>
      </div>
    </div>
  );
};

const RegionWidget = ({ people, fetchPeople, region }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    fetchPeople(region);
  }, []);

  return (
    <section className="region">
      {people.length
        ? people.map((person, i) => <Person person={person} key={i} />)
        : 'No people in this region'}
    </section>
  );
};

export { RegionWidget };
