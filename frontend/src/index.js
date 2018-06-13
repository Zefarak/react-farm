import React from 'react';
import ReactDOM from 'react-dom';
import Farms from "./Farms/farms";


class  App extends React.Component {
    render() {
        return (
            <Farms />
        )
    }
}


ReactDOM.render(<App />,document.getElementById('app'));

