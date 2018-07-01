import React from 'react';


class CropBody extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const {crop} = this.props;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-bell fa-fw"></i> Πληροφορίες
                    </div>
                    {crop !== undefined ? 
                    <div className="panel-body">
                        <div className="list-group">
                            <a href="#" class="list-group-item">
                                <i className="fa fa-comment fa-fw"></i> {crop.tag_farm}
                                <span className="pull-right text-muted small"><em>Χωράφι</em>
                                </span>
                            </a>    
                        </div>
                        <div className="list-group">
                            <a href="#" class="list-group-item">
                                <i className="fa fa-comment fa-fw"></i> {crop.area}
                                <span className="pull-right text-muted small"><em>Στρέμματα</em>
                                </span>
                            </a>    
                        </div>
                        <div className="list-group">
                            <a href="#" class="list-group-item">
                                <i className="fa fa-comment fa-fw"></i> {crop.qty} {crop.tag_title}
                                <span className="pull-right text-muted small"><em>Δέντρο-Φυτό</em>
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


export default CropBody