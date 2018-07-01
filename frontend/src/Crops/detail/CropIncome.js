import React from 'react';

class BodyIncome extends React.Component{

    constructor(props) {
        super(props)
    }

    render() {
        const {reports} = this.props;
        return(
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-bell fa-fw"></i> Ανάλυση
                    </div>
                    {reports !== undefined ? 
                    <div className="panel-body">
                        <div className="list-group">
                            <a href="#" class="list-group-item">
                                <i className="fa fa-comment fa-fw"></i> -600
                                <span className="pull-right text-muted small"><em>Διαφορά</em>
                                </span>
                            </a>    
                        </div>
                        <div className="list-group">
                            <a href="#" class="list-group-item">
                                <i className="fa fa-comment fa-fw"></i> {reports.total_value}
                                <span className="pull-right text-muted small"><em>Συνολικά Έξοδα</em>
                                </span>
                            </a>    
                        </div>
                        <div className="list-group">
                            <a href="#" class="list-group-item">
                                <i className="fa fa-comment fa-fw"></i> 0
                                <span className="pull-right text-muted small"><em>Συνολικά Εσοδα</em>
                                </span>
                            </a>    
                        </div>
                    </div>
                    :<div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-comment fa-fw"></i> Κάτι πήγε λάθος
                            <span className="pull-right text-muted small"><em>Δέντρο-Φυτό</em>
                            </span>
                        </a>    
                    </div>
                    }
                </div>
            </div>
            )
    }
}

export default BodyIncome