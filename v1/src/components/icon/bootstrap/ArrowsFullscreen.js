import * as React from 'react';

function SvgArrowsFullscreen(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			fill='currentColor'
			className='svg-icon'
			viewBox='0 0 16 16'
			{...props}>
			<path
				fillRule='evenodd'
				d='M5.828 10.172a.5.5 0 00-.707 0l-4.096 4.096V11.5a.5.5 0 00-1 0v3.975a.5.5 0 00.5.5H4.5a.5.5 0 000-1H1.732l4.096-4.096a.5.5 0 000-.707zm4.344 0a.5.5 0 01.707 0l4.096 4.096V11.5a.5.5 0 111 0v3.975a.5.5 0 01-.5.5H11.5a.5.5 0 010-1h2.768l-4.096-4.096a.5.5 0 010-.707zm0-4.344a.5.5 0 00.707 0l4.096-4.096V4.5a.5.5 0 101 0V.525a.5.5 0 00-.5-.5H11.5a.5.5 0 000 1h2.768l-4.096 4.096a.5.5 0 000 .707zm-4.344 0a.5.5 0 01-.707 0L1.025 1.732V4.5a.5.5 0 01-1 0V.525a.5.5 0 01.5-.5H4.5a.5.5 0 010 1H1.732l4.096 4.096a.5.5 0 010 .707z'
			/>
		</svg>
	);
}

export default SvgArrowsFullscreen;
