'use client'

import { NEW, PORTFOLIO } from '@/app/constants';
import { MemoInput as Input } from '@/app/dashboard/inputComponents';
import LoadingDots from '@/components/ui/LoadingDots';
import SessionLabel from '@/components/ui/SessionLabel/SessionLabel';
import { TextAreaInput } from '@/components/ui/TextArea/textArea';
import UploadImageSession from '@/components/ui/UploadImageSession/uploadImageSession';
import { supabaseClient as supabase } from '@/utils/supabase/client';
import {
	Card,
	FormControl,
	FormControlLabel,
	FormGroup,
	Radio,
	RadioGroup,
	Typography
} from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Checkbox } from 'react-daisyui';
import { useFormState } from 'react-dom';
import {
	ConfigType,
	PortfolioInputFieldsTypes,
	PortfolioType,
	RadioFieldsTypes,
	ThemeData,
	ThemeProps,
	WorkType,
	imageFieldsTypes,
	imagesSrcs
} from '../../../types';
import { create, editPortfolio } from '../../portfolioActions';

export const revalidate = 60;

const initialState = {
	message: ''
};

export function PortfolioForm({ params: { id } }: { params: { id: string } }) {
	const [configData, setConfigData] = useState<ConfigType>({
		id: '',
		created_at: null,
		color_theme_id: '',
		spacing_theme_id: '',
		typography_theme_id: '',
		page_layout: ''
	});

	useEffect(() => {
		const fetchConfigData = async () => {
			const { data: configData, error } = await supabase
				.from('config')
				.select('*')
				.single();

			if (error) throw error;

			setConfigData(configData as unknown as ConfigType);
		};

		fetchConfigData();
	}, []);

	const initialPortfolioState: PortfolioType = {
		id: id,
		title: '',
		created_at: null,
		description: '',
		image_1: '',
		image_1_src: '',
		image_2: '',
		image_2_src: '',
		page_layout: configData['page_layout'],
		spacing_theme_id: configData['spacing_theme_id'],
		color_theme_id: configData['color_theme_id'],
		typography_theme_id: configData['typography_theme_id'],
		updated_at: null,
		user_id: null,
		bio: '',
		contact: '',
		cv: '',
		download_count: null,
		work_id: [],
	};

	const [shouldSubmitForm, setShouldSubmitForm] = useState(false);
	const [editState, editFormAction] = useFormState(editPortfolio, initialState);
	const [focusedField, setFocusedField] = useState('');
	const [colorThemeData, setColorThemeData] = useState<ThemeData[]>([]);
	const [colorThemeSelected, setColorThemeSelected] = useState<string | null>(
		null
	);
	const [spacingThemeData, setSpacingThemeData] = useState<ThemeData[]>([]);
	const [spacingThemeSelected, setSpacingThemeSelected] = useState<
		string | null
	>(null);
	const [typographyThemeData, setTypographyThemeData] = useState<ThemeData[]>(
		[]
	);
	const [typographyThemeSelected, setTypographyThemeSelected] = useState<
		string | null
	>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [portfolioValues, setPortfolioValues] = useState<PortfolioType>(
		initialPortfolioState
	);

	useEffect(() => {
		const fetchPortfolioValues = async () => {
			const { data: portfolioDetails } = await supabase
				.from(PORTFOLIO)
				.select('*')
				.match({ id: id })
				.single();
			setPortfolioValues(portfolioDetails as PortfolioType);
		};

		id !== NEW
			? fetchPortfolioValues()
			: portfolioValues.spacing_theme_id !== '' && create(portfolioValues);
	}, [id, configData.id,
		portfolioValues.spacing_theme_id,
		portfolioValues.image_1,
		portfolioValues.image_2,
		portfolioValues.image_1_src,
		portfolioValues.image_2_src,
		editState.image_1_src,
		editState.image_2_src,
		portfolioValues.color_theme_id,
		portfolioValues.typography_theme_id]);

	const handleInputChange = useCallback(
		({ fieldName }: { fieldName: any }) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {

			const { name, value } = e.target;

			setPortfolioValues((portfolioAtual) => {
				const spacing =
					fieldName === 'spacing_theme_id'
						? value
						: portfolioAtual['spacing_theme_id'] ?? spacingThemeSelected;
				const color =
					fieldName === 'color_theme_id'
						? value
						: portfolioAtual['color_theme_id'] ?? colorThemeSelected;
				const typography =
					fieldName === 'typography_theme_id'
						? value
						: portfolioAtual['typography_theme_id'] ?? typographyThemeSelected;
				if (!portfolioAtual) {
					return portfolioValues;
				}

				const files = e.target instanceof HTMLInputElement && e.target.type === 'file' &&
					e.target.files

				const updatedPortfolio: PortfolioType = {
					...portfolioAtual,
					[name]: files ? (files! ? files[0] : value || '') : value || '',
					spacing_theme_id: spacing || '',
					color_theme_id: color || '',
					typography_theme_id: typography || ''
				};

				setShouldSubmitForm(true);
				setFocusedField(name);
				return updatedPortfolio;
			});
		},
		[]);

	// Use useEffect to handle the form submission
	useEffect(() => {
		if (shouldSubmitForm) {
			// Trigger the form submission here
			editForm(objectToFormData({ obj: portfolioValues }));

			// Reset the flag after submission
			setShouldSubmitForm(false);
		}
	}, [shouldSubmitForm, portfolioValues]);

	useEffect(() => {
		setPortfolioValues((portfolioAtual) => {
			const { id, created_at, ...initialConfig } = configData;
			const updatedPortfolio = {
				...portfolioAtual,

				...initialConfig
			};
			return updatedPortfolio;
		});
	}, [configData.id]);

	//- Lista completa de trabalhos - gravar no estado works * /
	const [works, setWorks] = useState<WorkType[] | null>([]);

	useEffect(() => {
		const fetchWorks = async () => {
			const { data: workData } = await supabase.from('work').select('*');
			setWorks(workData);
		};
		fetchWorks();
	}, []);

	const [worksSelecteds, setWorksSelecteds] = useState<string[]>(
		portfolioValues?.work_id as string[]
	);
	/*
		- Listar quais trabalhos estão selecionados no portfolio - portfolioValues.work_id
	*/
	useEffect(() => {
		worksSelecteds &&
			worksSelecteds?.map((id: string) => {
				setWorks((prevState: any) =>
					prevState.map((work: any) =>
						work.id === id
							? { ...work, checked: true }
							: { ...work, checked: false }
					)
				);
			});
	}, [worksSelecteds]);

	/*
		- Sempre que clicar em um trabalho, gravar em portfoliosValues.work_id
	*/
	useEffect(() => {

		setPortfolioValues({ ...portfolioValues, work_id: worksSelecteds });
	}, [worksSelecteds]);

	const handleCheckboxChange = (id: string) => {
		setWorksSelecteds((worksSelecteds: any) => {
			const worksIds = worksSelecteds.includes(id)
				? worksSelecteds.filter((workId: string) => workId !== id)
				: [...worksSelecteds, id];
			setPortfolioValues((portfolioAtual) => {
				const updatedPortfolio = {
					...portfolioAtual,
					work_id: worksIds
				};
				return updatedPortfolio;
			});
			return worksIds;
		});
		setShouldSubmitForm(true)
	};

	const workIsChecked = (id: string) =>
		worksSelecteds ? worksSelecteds.includes(id) : false;

	function workCard(work: any): React.JSX.Element {
		const border = workIsChecked(work.id) ? 'border-2 border-primary' : ''
		return (
			<div className={`card xl:card-side bg-base-100 shadow-xl ${border}`}>
				<figure><img src={work.image_1_src} alt={work.title} /></figure>
				<div className="card-body">
					<h2 className="card-title">{work.title}</h2>
					<p>{work.description}</p>
					<div className="card-actions justify-end">
						<Checkbox
							checked={workIsChecked(work.id)}
							onChange={() => handleCheckboxChange(work.id)}
							value={work.id}
							required
						/>
					</div>
				</div>
			</div>
		);
	}


	const useThemeEffect = ({
		tableName,
		setData,
		setSelected,
		setLoading
	}: ThemeProps) => {
		useEffect(() => {
			async function fetchData(): Promise<void> {
				const { data } = await supabase.from(tableName).select('*');

				if (setData && data) {
					setData(data);
				}

				if (setSelected && data && data.length > 0) {
					const selectedTheme =
						portfolioValues[`${tableName}_id` as keyof PortfolioType];
					if (
						selectedTheme ===
						initialPortfolioState[tableName as keyof PortfolioType]
					) {
						setSelected(data[0].id);
					}
					setLoading(false);
				}
			}
			fetchData();
		}, [
			tableName,
			setData,
			setSelected,
			setLoading,
			portfolioValues,
			id,
			configData.id
		]);
	};

	// Efeitos customizados para cada tabela
	useThemeEffect({
		tableName: 'color_theme',
		setData: setColorThemeData,
		setSelected: setColorThemeSelected,
		setLoading: setIsLoading
	});

	useThemeEffect({
		tableName: 'spacing_theme',
		setData: setSpacingThemeData,
		setSelected: setSpacingThemeSelected,
		setLoading: setIsLoading
	});

	useThemeEffect({
		tableName: 'typography_theme',
		setData: setTypographyThemeData,
		setSelected: setTypographyThemeSelected,
		setLoading: setIsLoading
	});

	const editForm = async (formData: FormData) => {
		id !== NEW && editFormAction(formData);
	};



	const RenderPageLayoutSelection = (
		{
			label,
			fieldName,
			values
		}: RadioFieldsTypes
	) => {
		const [{ value }] = values.filter((value) => value.default)
		return (
			<FormControl>
				<FormGroup aria-labelledby={label} sx={{ paddingY: 2 }}>
					<FormLabel id={`"${fieldName}_label`}>{label}</FormLabel>
					<RadioGroup
						row
						aria-labelledby={label}
						defaultValue={value}
						name={fieldName}
						id={fieldName}
						value={fieldName}
						onChange={handleInputChange({ fieldName: fieldName })}
					>
						{values.map((value) => <FormControlLabel
							key={value.label}
							value={value.value}
							control={<Radio />}
							label={value.label}
							checked={portfolioValues[fieldName as keyof PortfolioType] === value.value}
						/>)}

					</RadioGroup>
				</FormGroup>
			</FormControl>
		);
	};

	const objectToFormData = (
		{
			obj
		}: {
			obj: { [s: string]: any } | ArrayLike<unknown>;
		}
	): FormData => {
		const formData = new FormData();

		Object.entries(obj).forEach(([key, value]) => {
			formData.append(key, value);
		});

		return formData;
	};

	const RadioFieldsSession = ({ RadioFields }: { RadioFields: RadioFieldsTypes[] }) => {
		return (<div className='grid grid-cols-3'>
			{RadioFields && RadioFields.map(radioField => <div className='col-span-1' key={radioField.fieldName}>
				<RenderPageLayoutSelection fieldName={radioField.fieldName} label={radioField.label} values={radioField.values} />
			</div>)}
		</div>);
	};

	const renderThemeSelection = (
		{
			label,
			fieldName,
			themeData,
			handleChange
		}: {
			label: string;
			fieldName: string;
			themeData: ThemeData[];
			handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
		}
	): React.JSX.Element => {
		return (
			<FormControl key={fieldName}>
				<FormGroup aria-labelledby={`${fieldName} ID`} sx={{ paddingY: 2 }}>
					<FormLabel id={`${fieldName}_label`}>{label}</FormLabel>
					<RadioGroup
						aria-labelledby={fieldName}
						name={fieldName}
						id={fieldName}
						key={`memo-text-area-${fieldName}`}
						value={portfolioValues[fieldName as keyof PortfolioType]}
						onChange={handleChange}
						sx={{ display: 'flex', gap: 4, flexDirection: 'row' }}
					>
						{themeData?.map((theme: any) => (
							<Card
								sx={{
									display: 'flex',
									backgroundColor: 'transparent',
									flexDirection: 'row',
									flexGrow: '0'
								}}
								key={theme.id}
							>
								<div
									className='flex flex-row bg-transparent'
								>
									<FormControlLabel
										value={theme.id}
										control={<Radio />}
										label={theme.title}
										sx={{ marginLeft: 1 }}
									/>
									{fieldName === 'color_theme_id' && (
										<>
											<div style={{ backgroundColor: theme.background_primary_color }}
												className='flex flex-row w-16 h-16 justify-center items-center'
											>
												<Typography sx={{ color: theme.text_primary_color }}>
													{theme.title}
												</Typography>
											</div>
											<div
												style={{
													backgroundColor: theme.background_secondary_color,
												}}
												className='flex flex-row w-16 h-16 justify-center items-center'
											>
												<Typography sx={{ color: theme.text_secondary_color }}>
													{theme.title}
												</Typography>
											</div>
										</>
									)}
								</div>
							</Card>
						))}
					</RadioGroup>
				</FormGroup>
			</FormControl>
		);
	};

	const generalFields: PortfolioInputFieldsTypes = [
		{ label: 'Título', fieldId: 'title', rows: 1 },

	];

	const page1Fields: PortfolioInputFieldsTypes = [

	];

	const rowColValues = [
		{ value: 'column', label: 'Vertical', default: true },
		{ value: 'row', label: 'Horizontal', default: false },
	];

	const portraitLandscapValues = [
		{ value: 'portrait', label: 'Retrato', default: true },
		{ value: 'landscape', label: 'Paisagem', default: false },
	];

	const initialFinalValues = [
		{ value: 'column', label: 'Inicio', default: true },
		{ value: 'row', label: 'Final', default: false },
	];

	const pageLayoutRadioFields: RadioFieldsTypes[] = [
		{ label: 'Orientação da Página', fieldName: `page_layout`, values: portraitLandscapValues },
	]


	const page1ImageFields: imageFieldsTypes = [
		{ file: 'image_1', src: portfolioValues['image_1_src' as imagesSrcs]!!, labelButton: 'Imagem de Capa', handleInputChange: handleInputChange({ fieldName: 'image_1' }) },

	];
	const page2ImageFields: imageFieldsTypes = [
		{ file: 'image_2', src: portfolioValues['image_2_src' as imagesSrcs]!!, labelButton: 'Imagem de Contra Capa', handleInputChange: handleInputChange({ fieldName: 'image_2' }) }
	];


	const OptionsContentPanel = () =>
		<>
			<RadioFieldsSession RadioFields={pageLayoutRadioFields}></RadioFieldsSession>

			{['color', 'typography', 'spacing'].map((theme, index) =>
				renderThemeSelection({
					label: `Tema de ${theme === 'spacing'
						? 'espaçamento'
						: theme === 'typography'
							? 'Tipografia'
							: 'Cores'
						}`,
					fieldName: `${theme}_theme_id`,
					themeData:
						theme === 'color'
							? colorThemeData
							: theme === 'typography'
								? typographyThemeData
								: spacingThemeData,
					handleChange: handleInputChange({ fieldName: `${theme}_theme_id` as keyof ConfigType })
				})
			)}
		</>

	const RenderWorkCards = () => {
		return (
			<div className='grid grid-cols-2 gap-4'>
				{works &&
					works.map((work: any) => {
						return workCard(work);
					})}

			</div>
		);
	}

	const tabsPage1 = [
		{ label: 'Imagem de Capa', content: <UploadImageSession imageFields={page1ImageFields} /> },
		{ label: 'Imagem de Contra Capa', content: <UploadImageSession imageFields={page2ImageFields} /> },

	];


	const [tabPage1, setTabPage1] = useState(0)


	return !isLoading && initialPortfolioState.color_theme_id !== '' && id !== NEW ? (
		<form action={editForm} id="portfolioForm">
			<input id="id" name="id" hidden defaultValue={id} />
			<div className='flex flex-col gap-2 flex-1 p-16 pt-8'>
				<span className='badge badge-neutral badge-lg mb-8'>Portfolio</span><h1 className='text-4xl font-black'> {portfolioValues['title']}</h1>
				<div className="divider"></div>
				<SessionLabel label={"Informações do Portfolio"}></SessionLabel>
				<label className="form-control w-full max-w-6xl">
					<div className="label">
						<span className="label-text">Título</span>
					</div>
					<Input
						placeholder='title'
						id="title"
						name="title"
						required
						value={portfolioValues['title']}
						onChange={handleInputChange({ fieldName: 'title' })}
						autoFocus={focusedField === 'title'}
					/>
				</label>
				<div className='grid grid-cols-2 gap-4 gap-x-8'>

					<TextAreaInput
						labelText="Descrição"
						id="description"
						name="description"
						required
						value={portfolioValues['description']}
						onChange={handleInputChange({ fieldName: 'description' })}
						autoFocus={focusedField === 'description'}
					/>

					<TextAreaInput
						labelText="Bio"
						id="bio"
						name="bio"
						required
						value={portfolioValues['bio']}
						onChange={handleInputChange({ fieldName: 'bio' })}
						autoFocus={focusedField === 'bio'}
					/>

					<TextAreaInput
						labelText="Currículum Vitae"
						id="cv"
						name="cv"
						required
						value={portfolioValues['cv']}
						onChange={handleInputChange({ fieldName: 'cv' })}
						autoFocus={focusedField === 'cv'}
					/>

					<TextAreaInput
						labelText="Contato"
						id="contact"
						name="contact"
						required
						value={portfolioValues['contact']}
						onChange={handleInputChange({ fieldName: 'contact' })}
						autoFocus={focusedField === 'contact'}
					/>
				</div>
				<SessionLabel label={"Imagens do Portfolio"}></SessionLabel>
				<div className="flex w-full">
					<UploadImageSession imageFields={page1ImageFields} />
					<div className="divider divider-horizontal"></div>
					<UploadImageSession imageFields={page2ImageFields} />
				</div>
				<SessionLabel label={"Trabalhos do Portfolio"}></SessionLabel>
				<RenderWorkCards />
				<SessionLabel label={"Opções"}></SessionLabel>
				<OptionsContentPanel />

			</div>

			<p aria-live="polite" className="sr-only" role="status">
				{id && editState?.message}
			</p>
		</form>
	) : (
		<div className="flex items-center justify-center w-full h-52">
			<LoadingDots></LoadingDots>
		</div>
	);
}

