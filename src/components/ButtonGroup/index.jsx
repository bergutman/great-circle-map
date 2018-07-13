import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'redux-little-router';
import FaBars from 'react-icons/lib/fa/bars';
import FaArrowsAlt from 'react-icons/lib/fa/arrows-alt';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import Settings from './Settings';
import MapSelection from './MapSelection';
import MapButtonWithTooltip from './MapButtonWithTooltip';

// FIXME: ButtonGroup and MapButton are horrible variable names
function ButtonGroup({
  isSidebarDocked,
  toggleSidebarDock,
  handleSetSidebarOpen,
  isMobile,
  dispatch
}) {
  return (
    <div id="button-group">
      <div id="left-button-group">
        <MapButtonWithTooltip
          handleClick={!isMobile ? toggleSidebarDock : () => handleSetSidebarOpen(true)}
          tooltipId="menu"
          buttonContent={!isSidebarDocked || isMobile ? <FaBars /> : <FaArrowsAlt />}
          tooltipContent={
            !isSidebarDocked || isMobile ? <span>Show menu</span> : <span>Fullscreen</span>
          }
        />
        <MapButtonWithTooltip
          handleClick={() =>
            dispatch(
              push(
                {
                  query: { routes: '' }
                },
                { persistQuery: true }
              )
            )
          }
          tooltipId="delete"
          buttonContent={<FaTrashO />}
          tooltipContent={<span>Clear routes</span>}
        />
        <Settings />
      </div>
      {isMobile || <MapSelection />}
    </div>
  );
}

ButtonGroup.propTypes = {
  isSidebarDocked: PropTypes.bool.isRequired,
  toggleSidebarDock: PropTypes.func.isRequired,
  handleSetSidebarOpen: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isMobile: state.isMobile
  };
};

export default connect(mapStateToProps)(ButtonGroup);
