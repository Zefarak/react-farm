import React from 'react';



class IncomeFilters extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search_name: null
        }
        
    }


    render() {
        const {categories} = this.props;
        const {crops} = this.props;

        return(
            <form className='form'>
                <div className="form-group">
                    <label className='control-label' htmlFor="username">Search</label>
                    <input
                        type='text'
                        name='search_name'
                        value={search_name}
                        className="form-control"
                    />
                </div>
            </form>
        )
    }
}