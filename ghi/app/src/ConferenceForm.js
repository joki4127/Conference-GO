import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {            
        name: '',
        starts: '',
        ends: '',
        description: '',
        max_presentations: '',
        max_attendees: '',
        locations: []
        };
        this.handleNameChange= this.handleNameChange.bind(this);
        this.handleStartDateChange= this.handleStartDateChange.bind(this);
        this.handleEndDateChange= this.handleEndDateChange.bind(this);
        this.handleDescriptionChange= this.handleDescriptionChange.bind(this);
        this.handleMaxPresentationChange= this.handleMaxPresentationChange.bind(this);
        this.handleMaxAttendeeChange= this.handleMaxAttendeeChange.bind(this);
        this.handleLocationChange= this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit (event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.locations;
        console.log(data);
        console.log(this.state);

        const locationUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
        const newLocation = await response.json();
        
        const cleared = {
            name: '',
            starts: '',
            ends: '',
            description: '',
            max_presentations: '',
            max_attendees: '',
            location: '',
        };
        this.setState(cleared);
        }
    }

    handleNameChange (event) {
        const value = event.target.value;
        this.setState({name: value})
    }

    handleStartDateChange (event) {
        const value = event.target.value;
        this.setState({starts: value})
    }

    handleEndDateChange (event) {
        const value = event.target.value;
        this.setState({ends: value})
    }

    handleDescriptionChange (event) {
        const value = event.target.value;
        this.setState({description: value})
    }

    handleMaxPresentationChange (event) {
        const value = parseInt(event.target.value);
        this.setState({max_presentations: value})
    }

    handleMaxAttendeeChange (event) {
        const value = parseInt(event.target.value);
        this.setState({max_attendees: value})
    }

    handleLocationChange (event) {
        const value = parseInt(event.target.value);
        this.setState({location: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);
    
        if (response.ok) {
            const data = await response.json();
            this.setState({locations: data.locations});

        }
      }
    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new conference</h1>
                <form onSubmit={this.handleSubmit} id="create-conference-form">
                  <div className="form-floating mb-3">
                    <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleStartDateChange} value={this.state.starts} placeholder="Starts" required type="date" name="starts" id="starts" className="form-control" />
                    <label htmlFor="starts">Starts</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleEndDateChange} value={this.state.ends} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control" />
                    <label htmlFor="ends">Ends</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea onChange={this.handleDescriptionChange} value={this.state.description} placeholder="Description" required type="textarea" name="description" id="description" className="form-control" style={{height:"150px"}} />
                    <label htmlFor="description">Description</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleMaxPresentationChange} value={this.state.max_presentations} placeholder="Maximum presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control" min="0" />
                    <label htmlFor="maximum_presentations">Maximum Presentations</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleMaxAttendeeChange} value={this.state.max_attendees} placeholder="Maximum attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control" min="0" />
                    <label htmlFor="maximum_attendees">Maximum attendees</label>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleLocationChange} value={this.state.location} required id="location" name="location" className="form-select">
                      <option value="">Choose a location</option>
                      {this.state.locations.map(location => {
                            return (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                            );
                        })}
                    </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}
export default ConferenceForm;