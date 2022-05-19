import React from 'react';
import Button from '../../../components/bootstrap/Button';
import { CardFooterLeft, CardFooterRight } from '../../../components/bootstrap/Card';
const ConnectFooter = (props) =>{
const ConnectFacebookAccounts = () =>{
    console.log("In Button",props)
    let parameters={
        kyubi_user_token:props.userDetail.kyubi_user_token,
        _id:props.userDetail._id,
        connect:true
    }
    props.onConfirmConnect(parameters);
}
const ConfirmFacebookAccounts = () =>{
    
    props.onStoreNProccced(true);
}
    return(<>
    
            <CardFooterRight className='d-flex mb-4 me-5'>
                <Button	icon= "PersonAdd" onClick={ConnectFacebookAccounts}  className="btn btn-lg btn-hover-shadow-lg btn-light-info shadow-none">{props.connectText}</Button>
            
            </CardFooterRight>
            {props.confirmButton && (
                <CardFooterLeft>
                        <Button	icon= "PersonAdd" onClick={ConfirmFacebookAccounts}  className="btn btn-lg btn-hover-shadow-lg btn-light-info shadow-none">Confirm</Button>
                </CardFooterLeft>
            )}
            
            </>
    );
}
export default ConnectFooter;