import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';


class TreeForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleChange.bind(this);

        this.state = {
            title: '',
            description: ''
        }
    }

    createData(data){
        
    }

    handleChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value

        this.setState({
            [key]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = this.state
        this.createData(data)
    }



    componentDidMount() {
        const {tree} = this.props;
        if (tree !== undefined) {
            this.setState({
                title: tree.title,
                description: tree.description
            })
        } else {
            this.setState ({
                title: '',
                description: ''
            })
        }
    }

    render() {
        const {tree} = this.props;
        const {title} = this.state;
        const {description} = this.state;
        return (
            <div id='page-wrapper'>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">{tree.title}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <form  className="form" role="form">
                            <div className="form-group">
                                <label className="control-label">Τίτλος</label>
                                <input name="title" value={title} className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Περιγραφή</label>
                                <input  name='description' value={description} className="form-control" type="text" />
                            </div>
                                <button className="btn-success ">Δημιουργία</button>
                                <button className='btn btn-warning' >Καθαρισμός</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default TreeForm;
