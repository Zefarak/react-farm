import React from 'react';

class BodyIncome extends React.Component{

    constructor(props) {
        super(props)
    }

    render() {
        const {reports} = this.props;
        return(
            <div>
                <h2 className="ui blue header">
                  <i className="list  icon" />
                  <div className="content">
                    Πληροφορίες
                  </div>
                </h2>
                <div className="ui segments">
                    <div className="ui segment">
                        <p>Διαφορά {reports.total_value}</p>
                    </div>
                     <div className="ui green segment">
                        <p>Συνολικά Εσοδα {reports.total_value}</p>
                    </div>
                     <div className="ui red segment">
                        <p>Συνολικά Έξοδα {reports.total_value}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default BodyIncome;