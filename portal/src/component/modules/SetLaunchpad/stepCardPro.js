import { React } from 'react';
const StepCardpro = (props) =>{
    return (
        
        <div className="col-xl-4 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
                <div className="card-body">
                        
                        <div className="clearfix">
                                <div className="float-left">
                                    <i className={`${props.setdate.icon} text-danger icon-lg`}/>
                                </div>
                                <div className="float-right">
                                    <p className="mb-0 text-right text-dark">{props.setdate.maintext}</p>
                                    <div className="fluid-container">
                                        <h3 className="font-weight-medium text-right mb-0 text-dark">{props.setdate.count}</h3>
                                    </div>
                                </div>
                        </div>
                        <p className="text-muted mt-3 mb-0">
                            <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true"/>
                            {props.setdate.pstate}
                        </p>
                </div>
            </div>
        </div>
        
        
        
    );
}
export default StepCardpro;