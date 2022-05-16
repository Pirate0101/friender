import React from 'react';
import Humans from '../../../assets/img/scene8.png';
import HumansWebp from '../../../assets/img/scene8.webp';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { layoutMenu } from '../../../menu';

const Blank = () => {
	return (
		<PageWrapper title={layoutMenu.setWorld.text}>
			<Page>
				<div className='row d-flex align-items-center h-100'>
					<div
						className='col-12 d-flex justify-content-center'
						style={{ fontSize: 'calc(3rem + 3vw)' }}>
						<p>SetWorld</p>
					</div>
					<div className='col-12 d-flex align-items-baseline justify-content-center'>
						<img
							srcSet={HumansWebp}
							src={Humans}
							alt='Humans'
							style={{ height: '70vh' }}
						/>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Blank;
