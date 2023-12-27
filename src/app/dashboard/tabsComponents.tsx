import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useState } from 'react';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{children}
				</Box>
			)}
		</div>
	);
}

export function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

interface TabsPanelProps {
	tabs: { label: string; content: React.ReactNode }[];
	initialTab: number;
}

export const TabsPanelRenderer: React.FC<TabsPanelProps> = ({ tabs, initialTab }) => {
	const [tabValue, setTabValue] = useState(initialTab);

	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	return (
		<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
			<Tabs value={tabValue} onChange={handleChangeTab} aria-label="tabs">
				{tabs.map((tab, index) => (
					<Tab label={tab.label} key={index} />
				))}
			</Tabs>
			<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
				{tabs.map((tab, index) => (
					<div
						key={index}
						role="tabpanel"
						hidden={tabValue !== index}
						id={`simple-tabpanel-${index}`}
						aria-labelledby={`simple-tab-${index}`}
					>
						{tabValue === index && (
							<Box sx={{ p: 3 }}>
								{tab.content}
							</Box>
						)}
					</div>

				))}
			</Box>
		</Box>
	);
};