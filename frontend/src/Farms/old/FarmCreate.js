import React from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies'


class  FarmCreate extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.postTitleRef = React.createRef();
        this.state =  {
            active:false,
            title: null,
            area: null,
            user: null,
            crops: null
        };
    }


    createFarm(data) {
        const endpoint = '/api/farms/create';
        const csrfToken = cookie.load('csrftoken');
        console.log(csrfToken);
        let thisComp = this;
        if (csrfToken !== undefined){
            let lookupOptions = {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(data),
                credentials: 'inlude'
          }
        }
        let lookupOptions = {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(data),

          };

        fetch(endpoint, lookupOptions).then(
            function(response) {
                return response.json()
            }
        ).then(function(responseData) {
            console.log(responseData);
            if(thisComp.props.newFarmItemCreated) {
                thisComp.props.newFarmItemCreated(responseData)
            }
            thisComp.clearForm();
        }).catch(function(error) {
            console.log(error);
            alert("problem!")
        })
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state);
        let data = this.state;
        this.createFarm(data)

    }

    handleInputChange(event) {
        event.preventDefault();
        console.log(event.target.name, event.target.value);
        let key = event.target.name;
        let value = event.target.value;
        if (key === 'title'){
            if(value.length > 10) {
                alert("Big")
            }
        }
        if (key === 'crops'){
            console.log(event.target.value);
            value = [event.target.value]
        }
        this.setState({
            [key]: value,
            [event.target.name]: event.target.value
        })
    }

    handleCheckboxChange(event){
        this.setState({
            active: !this.state.draft
        })
    }

    clearForm() {
        if (event) {
            event.preventDefault()

        }
        this.postCreateForm.reset()
    }

    componentDidMount(){
        this.setState({
            title: null,
            area: 1,
            active: null,
            user: null
        });
        this.postTitleRef.current.focus()
    }

    render() {
        
        return (
           <form onSubmit={this.handleSubmit} ref={(el) => this.postCreateForm = el} method="POST" className="form-horizontal" >
               <fieldset>
                   <div className="form-group ">
                       <label className="col-sm-2 control-label ">
                           Title
                       </label>
                       <div className="col-sm-10">
                           <input ref={this.postTitleRef} onChange={this.handleInputChange} name="title" className="form-control" type="text" required />
                       </div>
                   </div>
                   <div className="form-group horizontal-checkbox ">
                       <label className="col-sm-2 control-label">Active</label>
                       <div className="col-sm-10">
                           <input onChange={this.handleCheckboxChange} type="checkbox" name="active" value={this.state.active} />
                       </div>
                   </div>
                   <div className="form-group ">
                       <label className="col-sm-2 control-label">Area</label>
                       <div className="col-sm-10">
                           <input onChange={this.handleInputChange} name="area" className="form-control" type="number"  required />
                       </div>
                   </div>
                   <div className="form-group">
                       <label className="col-sm-2 control-label ">User</label>
                       <div className="col-sm-10">
                           <select onChange={this.handleInputChange} className="form-control" name="user">
                               <option value="1"  >admin</option>
                           </select>
                       </div>
                   </div>
                   <div className="form-group">
                       <label className="col-sm-2 control-label ">
                           Cropsn
                       </label>
                       <div className="col-sm-10">
                           <select onChange={this.handleInputChange} className="form-control" name="cropis">
                               <option value="1"  >Elia</option>
                           </select>
                       </div>
                   </div>
                   <div className="form-actions">
                       <button onClick={this.handleSubmit} className="btn btn-primary" title="Make a POST request on the Farm Api resource">POSTi</button>
                       <br />
                       <button onClick={this.clearForm} className="btn btn-secondary" title="Make a POST request on the Farm Api resource">Cancel</button>
                   </div>
               </fieldset>
           </form>

        )
    }
}


export default FarmCreate