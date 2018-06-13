import React from 'react';
import SecondNav from './SecondNav';
import Navbar from './Navbar';
import FarmsTable from '../Farms/Farms';
import FarmCreate from '../Farms/FarmCreate';


class Index extends React.Component {

    render() {
        return(
            <div>
                <Navbar />
                <div class="container-fluid">
                    <div class="row">
                        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                            <SecondNav />
                        </main>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                            <FarmsTable />
                        </div>
                        <div className='col-md-3'>
                            <FarmCreate />
                        </div>
                    </div>
                    
                </div>
            </div>
            
           
        )
    }
}

export default Index