import { connect } from 'react-redux';

import { Search } from 'components/forms';
import { DistrictWidget } from 'components/people';
import { searchDistrict } from 'actions';
import { searchDistrictError, searchDistricts, searchDistrictPending } from 'reducers';

const mapStateToProps = (state )=> ({
  error: searchDistrictError(state),
  searchResults: searchDistricts(state),
  pending: searchDistrictPending(state)
})
export const mapDispatchToProps =  { searchDistrict: (query) => searchDistrict(query) };

const connectedWidget = connect(mapStateToProps, mapDispatchToProps)(Search);
const districtWidget = connect(mapStateToProps, mapDispatchToProps)(DistrictWidget)
export { connectedWidget as SearchContainer, districtWidget as District };
