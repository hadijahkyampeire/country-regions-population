import React from 'react';
import { groupBy } from 'lodash';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import { fromQueryString } from 'utils';
import './__styles__/district.scss';

const Person = ({ people, district }) => {
    return (
        <>
            {
                people.map((person, i) => {
                    return (
                        <Card key={i} className="person">
                            <Card.Body>
                                {person.name} <br />
                                {person.district} <br />
                                {person.region} <br />
                                {person.country} <br />
                                {person.date_of_birth} <br />
                            </Card.Body>
                        </Card>
                    );
                })
            }
        </>
    );
};

const PeopleByDistrict = ({ district, people }) => 
        <div>
            <h3>{district}</h3>
            <CardGroup>
                <Person people={people}/>
            </CardGroup>
        </div>;


const DistrictWidget = ({searchDistrict, searchResults, location, ...props}) => {
    const groupByDistrict = groupBy(searchResults, 'district')
    const query = location.query ? fromQueryString(location.query.replace(/^[?#]*/g, '')).q: undefined

    React.useEffect(()=>{
        searchDistrict(query)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            { Object.entries(groupByDistrict).map(([key, value], i) => <PeopleByDistrict key={i} searchResults={ searchResults } district={key} people={value}/>) }
        </div>
    );
};

export { DistrictWidget };