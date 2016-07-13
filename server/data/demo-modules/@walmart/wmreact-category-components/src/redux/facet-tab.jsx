import React, { PropTypes } from "react";
import { connect } from "react-redux";
import FacetTab from "../react/components/facet-tab";

import {
  onFacetTabChange,
  onFacetTabLoad
} from "./actions";

const mapStateToProps = (state, ownProps) => {
  const moduleUiState = state.ui[ownProps.moduleId];
  const active = moduleUiState ? moduleUiState.active : 0;
  const tabsToLoad = moduleUiState ? moduleUiState.loadedTabs : [0];

  return { active, tabsToLoad };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (id) => dispatch(onFacetTabChange(ownProps.moduleId, parseInt(id, 10))),
  onLoad: () => dispatch(onFacetTabLoad(ownProps.moduleId))
});

/* Wrapper component to create initial state for given module. */
class FacetTabWrapper extends React.Component {
  constructor(props) {
    super(props);
    props.onLoad();
  }

  render() {
    return <FacetTab {...this.props} />;
  }
}

FacetTabWrapper.propTypes = {
  onLoad: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FacetTabWrapper);
