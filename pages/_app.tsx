import React, { useState } from 'react'
import App, { Container } from 'next/app';
import PrefersLightMode from '@lazy-react/prefers-light-mode/component';
import CssBaseline from '@material-ui/core/CssBaseline';

export default class MyApp extends App
{
	render()
	{
		const { Component, pageProps } = this.props;
		return (
			<PrefersLightMode key="PrefersLightMode">
				<CssBaseline>
					<Component {...pageProps} />
				</CssBaseline>
			</PrefersLightMode>
		)
	}
}
