import React, { Fragment } from 'react';
const ProfileDetail = (props)=>{
    return ( <Fragment>
                            <div className='row g-3'>
                                <div className='col d-flex'>
                                    <div className='flex-shrink-0'>
                                        <div className='position-relative'>
                                            <div
                                                className='ratio ratio-1x1'
                                                style={{ width: 100 }}>
                                                <div
                                                    className={`bg-l25-primary rounded-2 d-flex align-items-center justify-content-center overflow-hidden shadow`}>
                                                    <img
                                                        src={props.profileInfo.UserFacebookImage}
                                                        alt={props.profileInfo.UserFacebookName}
                                                        width={100}
                                                    />
                                                </div>
                                            </div>
                                                <span className='position-absolute top-100 start-85 translate-middle badge border border-2 border-light rounded-circle bg-success p-2'>
                                                    <span className='visually-hidden'>
                                                        Online user
                                                    </span>
                                                </span>
                                        </div>
                                    </div>
                                    <div className='flex-grow-1 ms-3 d-flex justify-content-between'>
                                        <div className='w-100'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <div className='d-flex align-items-center'>
                                                            <div className='fw-bold fs-5 me-2'>
                                                            {props.profileInfo.UserFacebookName}
                                                            </div>
                                                        </div>
                                                        <div className='text-muted'>
                                                            @{props.profileInfo.UserFacebookUsername}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row g-2 mt-3'>
                                                        
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>);
}
export default ProfileDetail;
                       