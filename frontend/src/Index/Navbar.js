import React from 'react';
import { Link } from 'react-router-dom';


class Navbar extends React.Component{

    render() {
        return (
          <nav class="navbar navbar-default navbar-static-top" role="navigation">
            <div class="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="index.html">SB Admin v2.0</a>
            </div>
            <ul className="nav navbar-top-links navbar-right">
              <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                      <i className="fa fa-envelope fa-fw"></i> <i class="fa fa-caret-down"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-messages">
                      <li>
                          <a href="#">
                              <div>
                                  <strong>John Smith</strong>
                                  <span className="pull-right text-muted">
                                      <em>Yesterday</em>
                                  </span>
                              </div>
                              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                          </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                          <a href="#">
                              <div>
                                  <strong>John Smith</strong>
                                  <span className="pull-right text-muted">
                                      <em>Yesterday</em>
                                  </span>
                              </div>
                              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                          </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                          <a href="#">
                              <div>
                                  <strong>John Smith</strong>
                                  <span class="pull-right text-muted">
                                      <em>Yesterday</em>
                                  </span>
                              </div>
                              <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                          </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                          <a className="text-center" href="#">
                              <strong>Read All Messages</strong>
                              <i className="fa fa-angle-right"></i>
                          </a>
                      </li>
                  </ul> 
              </li>
              <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                      <i className="fa fa-tasks fa-fw"></i> <i class="fa fa-caret-down"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-tasks">
                      <li>
                          <a href="#">
                              <div>
                                  <p>
                                      <strong>Task 1</strong>
                                      <span class="pull-right text-muted">40% Complete</span>
                                  </p>
                                  <div className="progress progress-striped active">
                                      <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" >
                                          <span className="sr-only">40% Complete (success)</span>
                                      </div>
                                  </div>
                              </div>
                          </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                          <a href="#">
                              <div>
                                  <p>
                                      <strong>Task 2</strong>
                                      <span className="pull-right text-muted">20% Complete</span>
                                  </p>
                                  <div class="progress progress-striped active">
                                      <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" >
                                          <span className="sr-only">20% Complete</span>
                                      </div>
                                  </div>
                              </div>
                          </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                          <a href="#">
                              <div>
                                  <p>
                                      <strong>Task 3</strong>
                                      <span className="pull-right text-muted">60% Complete</span>
                                  </p>
                                  <div className="progress progress-striped active">
                                      <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" >
                                          <span class="sr-only">60% Complete (warning)</span>
                                      </div>
                                  </div>
                              </div>
                          </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                          <a href="#">
                              <div>
                                  <p>
                                      <strong>Task 4</strong>
                                      <span className="pull-right text-muted">80% Complete</span>
                                  </p>
                                  <div className="progress progress-striped active">
                                      <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" >
                                          <span className="sr-only">80% Complete (danger)</span>
                                      </div>
                                  </div>
                              </div>
                          </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                          <a className="text-center" href="#">
                              <strong>See All Tasks</strong>
                              <i className="fa fa-angle-right"></i>
                          </a>
                      </li>
                  </ul>
                 
              </li>
              
              <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                      <i className="fa fa-bell fa-fw"></i> <i className="fa fa-caret-down"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-alerts">
                      <li>
                          <a href="#">
                              <div>
                                  <i className="fa fa-comment fa-fw"></i> New Comment
                                  <span className="pull-right text-muted small">4 minutes ago</span>
                              </div>
                          </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                          <a href="#">
                              <div>
                                  <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                                  <span className="pull-right text-muted small">12 minutes ago</span>
                              </div>
                          </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                          <a href="#">
                              <div>
                                  <i className="fa fa-envelope fa-fw"></i> Message Sent
                                  <span className="pull-right text-muted small">4 minutes ago</span>
                              </div>
                          </a>
                      </li>
                      <li class="divider"></li>
                      <li>
                          <a href="#">
                              <div>
                                  <i class="fa fa-tasks fa-fw"></i> New Task
                                  <span class="pull-right text-muted small">4 minutes ago</span>
                              </div>
                          </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                          <a href="#">
                              <div>
                                  <i className="fa fa-upload fa-fw"></i> Server Rebooted
                                  <span className="pull-right text-muted small">4 minutes ago</span>
                              </div>
                          </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                          <a className="text-center" href="#">
                              <strong>See All Alerts</strong>
                              <i className="fa fa-angle-right"></i>
                          </a>
                      </li>
                  </ul>
                 
              </li>
              
              <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                      <i className="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-user">
                      <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                      </li>
                      <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
                      </li>
                      <li className="divider"></li>
                      <li><a href="login.html"><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                      </li>
                  </ul>
                 
              </li>
              
          </ul>
        
          <div className="navbar-default sidebar" role="navigation">
              <div className="sidebar-nav navbar-collapse">
                  <ul className="nav" id="side-menu">
                      <li className="sidebar-search">
                          <div className="input-group custom-search-form">
                              <input type="text" className="form-control" placeholder="Search..." />
                              <span className="input-group-btn" >
                              <button className="btn btn-default" type="button">
                                  <i className="fa fa-search"></i>
                              </button>
                          </span>
                          </div>
                          
                      </li>
                      <li>
                          <a><Link maintainScrollPosition={false} to={{ 
                              pathname:`/`,
                              state:{fromDashboard: false}
                          }}>Αρχική Σελίδα</Link></a>
                      </li>
                      <li>
                          <a href="#">
                              <i class="fa fa-bar-chart-o fa-fw"></i> Χωράφια<span className="fa arrow"></span>
                          </a>
                          <ul className="nav nav-second-level">
                              <li>
                                  <a><Link maintainScrollPosition={false} to={{
                                      pathname:`/χωράφια/`,
                                      state:{fromDashboard: false}
                                  }}>Χωράφια</Link></a>     
                              </li>  
                              <li>
                                  <a>
                                      <Link maintainScrollPosition={false} to={{
                                          pathname:`/καλλιέργιες/`,
                                          state:{fromDashboard: false}
                                      }}>Kαλλιέργιες
                                      </Link>
                                  </a>
                              </li>
                              <li>
                                <a><Link maintainScrollPosition={false} to={{
                                      pathname: `/δέντρα/`,
                                    state: {fromDashboard: false}
                                    }}>Δέντρα
                                </Link></a>
                              </li>
                              <li>
                                  <a href="">Δέντρα</a>
                              </li>
                          </ul>
                          
                      </li>
                      <li>
                          <a href=""><i className="fa fa-table fa-fw"></i><Link maintainScrollPosition={false} to={{ 
                              pathname:`/expenses/`,
                              state:{fromDashboard: false}
                          }}>Εξοδα</Link></a>
                      </li>
                      <li>
                          <a href=""><i className="fa fa-table fa-fw"></i><Link maintainScrollPosition={false} to={{ 
                              pathname:`/expenses-categories/`,
                              state:{fromDashboard: false}
                          }}>Κατηγορίες Εξόδων</Link></a>
                      </li>
                      <li>
                          <a href=""><i className="fa fa-table fa-fw"></i><Link maintainScrollPosition={false} to={{ 
                              pathname:`/incomes/invoices`,
                              state:{fromDashboard: false}
                          }}>Έσοδα</Link></a>
                      </li>
                  </ul>
              </div>
              
          </div>
          
      </nav>
     
        )
    }
}

export default Navbar