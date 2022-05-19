import { React } from 'react';
import Icon from '../../../components/icon/Icon';

const FriendCardAll = (props)   =>  {
    console.log(props)
    return(
        <div className='col-xl-6'>
                            <div className={`d-flex align-items-center rounded-2 p-3 bg-l10-${props.UsableClass}`}>
                                <div className='flex-shrink-0'>
                                    <Icon icon={props.UsableIcon} size='3x' color={props.UsableClass} />
                                </div>
                                <div className='flex-grow-1 ms-3'>
                                    <div className='fw-bold fs-5 mb-0'>{props.UbsableText}</div>
                                    <div className='fw-bold fs-3 mb-0'>
                                        {
                                            props.UsableBodyState === ''
                                        }
                                        {(() => {
                                        switch (props.UsableBodyState) {
                                        case "Icon":
                                        return (<Icon icon={props.UsableBodyContent} size='2x' color={props.UsableClass} />);
                                        case "Loader":
                                        return props.UsableBodyLoader;
                                        default:
                                        return "Syncked Completed";
                                        }
                                        })()}
                                        
                                    </div>
                                    <div className='text-muted mt-n2 truncate-line-1'>
                                    {props.UbsableSilentText}
                                    </div>
                                </div>
                            </div>
                        </div>
    );
}
export default FriendCardAll