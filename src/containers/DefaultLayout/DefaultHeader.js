import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/sygnet.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'SADAKA Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'SADAKA Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            {
              localStorage.getItem("type")==="admin" ?
                <DropdownToggle nav>
                  <img src={'../../assets/img/avatars/sygnet.png'} className="img-avatar" alt="louay.meskini@gmail.com" />
                </DropdownToggle>:null
            }
            { localStorage.getItem("type")==="association" ?
            <DropdownToggle nav>
              <img src={'http://127.0.0.1:8000/association/img/'+localStorage.getItem("imageAssociation")} className="img-avatar" alt={localStorage.getItem("imageAssociation")} />
            </DropdownToggle>:null
            }
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i>Déconnexion</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>

        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
