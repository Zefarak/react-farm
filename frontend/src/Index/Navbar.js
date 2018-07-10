import React from 'react';
import { Link } from 'react-router-dom';


class Navbar extends React.Component{

    constructor(props){
        super(props);
    }
    
    render() {
        const log_in = (<li className="dropdown">
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
                
                </li>)
        const log_out = (
            <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                      <i className="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-user">
                    {/*
                    <li onClick={() => props.display_form('login')}>login</li>
                    <li onClick={() => props.display_form('signup')}>signup</li>  
                    */}
                  </ul>
                 
              </li>
        )
        const {logged_in} = this.props;
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
                                  <strong>Φίλτρα</strong>
                              </div>
                          </a>
                      </li>
                      <li className="divider"></li>
                      <li>
                          <form method="GET" className="form">
                              <div className="form-group">
                                  <label>Ημερομηνία Από</label>
                                  <input className="form-control" type="date" />
                              </div>
                              <div className="form-group">
                                  <label>Ημερομηνία Εώς</label>
                                  <input className="form-control" type="date" />
                              </div>
                              <button className="btn btn-primary">Αποθήκευση</button>
                          </form>
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
              {logged_in !== undefined ? log_in : log_out}   
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
                          <a href=""><i className="fa fa-table fa-fw"></i><Link maintainScrollPosition={false} to={{ 
                              pathname:`/data/`,
                              state:{fromDashboard: false}
                          }}>Δεδομένα</Link></a>
                      </li>
                      <li>
                          <a href=""><i className="fa fa-table fa-fw"></i><Link maintainScrollPosition={false} to={{ 
                              pathname:`/expenses/`,
                              state:{fromDashboard: false}
                          }}>Εξοδα</Link></a>
                      </li>
                      <li>
                          <a href=""><i className="fa fa-table fa-fw"></i><Link maintainScrollPosition={false} to={{ 
                              pathname:`/payroll/`,
                              state:{fromDashboard: false}
                          }}>Μισθοδοσία</Link></a>
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
                      <li>
                          <a href=""><i className="fa fa-table fa-fw"></i><Link maintainScrollPosition={false} to={{ 
                              pathname:`/reports/`,
                              state:{fromDashboard: false}
                          }}>Reports</Link></a>
                      </li>
                  </ul>
              </div>
              
          </div>
          
      </nav>
     
        )
    }
}

export default Navbar