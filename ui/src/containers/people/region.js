import { connect } from 'react-redux';

import { RegionWidget } from 'components/people';
import { fetchPeople } from 'actions';
import {getPeopleError, getPeople, getPeoplePending} from 'reducers';

const mapStateToProps = (state, {region} )=> ({
  error: getPeopleError(state),
  people: getPeople(region, state),
  pending: getPeoplePending(state)
})
const mapDispatchToProps = { fetchPeople: (region) => fetchPeople(region) };

const connectedWidget = connect(mapStateToProps, mapDispatchToProps)(RegionWidget);
export { connectedWidget as Regions };
