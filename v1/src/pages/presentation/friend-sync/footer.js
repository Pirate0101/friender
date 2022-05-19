import { Fragment, React } from 'react';
import Button from '../../../components/bootstrap/Button';
import { CardFooterRight } from '../../../components/bootstrap/Card';
const Footer = (props) =>{
const TrigerFacebookActions = () =>{
    console.log("In Button",props)
    props.onInitiateFacebookAction(props.footerStep)
    //props.onConfirmConnect(parameters);
}

    return(
        <Fragment>
            { props.footerState && (
                <CardFooterRight className='d-flex mb-4 me-5'>
                    {props.footerButton === true ?
                    <Button	icon= {props.footerButtonIcon} onClick={TrigerFacebookActions}  className="btn btn-lg btn-hover-shadow-lg btn-light-info shadow-none">{props.footerButtonText}</Button>
                    :
                    props.footerContent 
                    }
                    

                </CardFooterRight>
            )}
            
        </Fragment>
    
    
            
            
            
            
    );
}
export default Footer;