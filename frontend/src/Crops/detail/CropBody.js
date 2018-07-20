import React from 'react';


class CropBody extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const {crop} = this.props;
        return (
            <div>
                {crop !== undefined ?
                <div className="ui segments">
                    <div className="ui segment">
                        <p>Χωράφι {crop.tag_farm}</p>
                    </div>
                    <div className="ui segment">
                        <p>Στρέμματα {crop.area}</p>
                    </div>
                    <div className="ui segment">
                        <p>Δέντρο {crop.tag_title}</p>
                    </div>
                    <div className="ui segment">
                        <p>Ποσότητα {crop.qty} </p>
                    </div>
                    
                </div>
                :<p>gfg</p>
                }
            </div>

        )
    }
}


export default CropBody