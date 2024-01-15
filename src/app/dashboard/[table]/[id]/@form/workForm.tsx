'use client'

import LoadingDots from '@/components/ui/LoadingDots';
import { supabaseClient as supabase } from '@/utils/supabase/client';
import {
	Button,
	Card,
	FormControl,
	FormControlLabel,
	FormGroup,
	Radio,
	RadioGroup,
	Typography
} from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Image from 'next/image';
import {
	ConfigType,
	ThemeData,
	ThemeProps,
	WorkFieldId,
	WorkInputFieldsTypes,
	RadioFieldsTypes,
	WorkType,
	imageFieldsTypes,
	imagesFiles,
	imagesSrcs,
} from '../../../types';

import { NEW, WORK } from '@/app/constants';
import { MemoInput as Input } from '@/app/dashboard/inputComponents';
import { Tabs } from '@/app/dashboard/tabsComponents';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createWork, editWork } from '../../workActions';
import UploadImageSession from '@/components/ui/UploadImageSession/uploadImageSession';
import SessionLabel from '@/components/ui/SessionLabel/SessionLabel';
import { TextAreaInput } from '@/components/ui/TextArea/textArea';

export const revalidate = 60;

const initialState = {
	message: ''
};

export function WorkForm({ params: { id } }: { params: { id: string } }) {
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

	const initialWorkState: WorkType = {
		id: id,
		title: '',
		created_at: null,
		description_1: '',
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
		description_1_order: '',
		description_2: '',
		description_2_order: '',
		image_1_order_image: '',
		image_1_orientation: '',
		image_2_order_image: '',
		image_2_orientation: '',
		tech_1_order: '',
		tech_2_order: '',
		tech_description_1: '',
		tech_description_2: '',
		text_1_horizontal_align: '',
		text_1_vertical_align: '',
		text_2_horizontal_align: '',
		text_2_vertical_align: ''
	};

	const [shouldSubmitForm, setShouldSubmitForm] = useState(false);
	const [editState, editFormAction] = useFormState(editWork, initialState);
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
	const [workValues, setWorkValues] = useState<WorkType>(
		initialWorkState
	);

	useEffect(() => {
		const fetchWorkValues = async () => {
			const { data: workDetails } = await supabase
				.from(WORK)
				.select('*')
				.match({ id: id })
				.single();
			setWorkValues(workDetails as WorkType);
		};

		id !== NEW
			? fetchWorkValues()
			: workValues.spacing_theme_id !== '' && createWork(workValues);
	}, [id, configData.id,
		workValues.spacing_theme_id,
		workValues.image_1,
		workValues.image_2,
		workValues.image_1_src,
		workValues.image_2_src,
		editState.image_1_src,
		editState.image_2_src,
		workValues.color_theme_id,
		workValues.typography_theme_id]);

	const handleInputChange = useCallback(
		({ fieldName }: { fieldName: keyof WorkType }) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {

			const { name, value } = e.target;

			setWorkValues((workAtual) => {
				const spacing =
					fieldName === 'spacing_theme_id'
						? value
						: workAtual['spacing_theme_id'] ?? spacingThemeSelected;
				const color =
					fieldName === 'color_theme_id'
						? value
						: workAtual['color_theme_id'] ?? colorThemeSelected;
				const typography =
					fieldName === 'typography_theme_id'
						? value
						: workAtual['typography_theme_id'] ?? typographyThemeSelected;
				if (!workAtual) {
					return workValues;
				}

				const files = e.target instanceof HTMLInputElement && e.target.type === 'file' &&
					e.target.files

				const updatedWork: WorkType = {
					...workAtual,
					[name]: files ? (files! ? files[0] : value || '') : value || '',
					spacing_theme_id: spacing || '',
					color_theme_id: color || '',
					typography_theme_id: typography || ''
				};

				setShouldSubmitForm(true);
				setFocusedField(name);
				return updatedWork;
			});
		},
		[]);

	// Use useEffect to handle the form submission
	useEffect(() => {
		if (shouldSubmitForm) {
			// Trigger the form submission here
			editForm(objectToFormData({ obj: workValues }));

			// Reset the flag after submission
			setShouldSubmitForm(false);
		}
	}, [shouldSubmitForm, workValues]);

	useEffect(() => {
		setWorkValues((workAtual) => {
			const { id, created_at, ...initialConfig } = configData;
			const updatedWork = {
				...workAtual,

				...initialConfig
			};
			return updatedWork;
		});
	}, [configData.id]);

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
						workValues[`${tableName}_id` as keyof WorkType];
					if (
						selectedTheme ===
						initialWorkState[tableName as keyof WorkType]
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
			workValues,
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
							checked={workValues[fieldName] === value.value}
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
						value={workValues[fieldName as keyof WorkType]}
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
		{ label: 'Orientação da Página', fieldName: `page_layout` as keyof WorkType, values: portraitLandscapValues },
	]

	const generateRadioPageFields = (i: number): RadioFieldsTypes[] => {
		const page = i.toString()
		const radioFieldsPage = [
			{ label: 'Ordem da descrição', fieldName: `description_${page}_order` as keyof WorkType, values: initialFinalValues },
			{ label: 'Ordem da imagem', fieldName: `image_${page}_order_image` as keyof WorkType, values: initialFinalValues },
			{ label: 'Orientação da imagem', fieldName: `image_${page}_orientation` as keyof WorkType, values: rowColValues },
			{ label: 'Descrição - Alinhamento Horizontal', fieldName: `text_${page}_horizontal_align` as keyof WorkType, values: initialFinalValues },
			{ label: 'Descrição - Alinhamento Vertical', fieldName: `text_${page}_vertical_align` as keyof WorkType, values: initialFinalValues },
		]
		return radioFieldsPage
	}

	const radioFieldsPage1 = generateRadioPageFields(1)
	const radioFieldsPage2 = generateRadioPageFields(2)

	const page1ImageFields: imageFieldsTypes = [
		{ file: 'image_1', src: workValues['image_1_src' as imagesSrcs]!!, labelButton: 'Imagem de Destaque', handleInputChange: handleInputChange({ fieldName: 'image_1' }) },
	];
	const page2ImageFields: imageFieldsTypes = [
		{ file: 'image_2', src: workValues['image_2_src' as imagesSrcs]!!, labelButton: 'Imagem de Destaque', handleInputChange: handleInputChange({ fieldName: 'image_2' }) }
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

	return !isLoading && initialWorkState.color_theme_id !== '' && id !== NEW ? (
		<form action={editForm} id="workForm">
			<input id="id" name="id" hidden defaultValue={id} />

			<div className='flex flex-col gap-2 flex-1 p-16 pt-8'>
				<span className='badge badge-neutral badge-lg mb-8'>Obra</span><h1 className='text-4xl font-black'> {workValues['title']}</h1>
				<div className="divider"></div>
				<SessionLabel label={"Informações da Obra"}></SessionLabel>
				<Input
					placeholder='title'
					id="title"
					name="title"
					required
					value={workValues['title']}
					onChange={handleInputChange({ fieldName: 'title' })}
					autoFocus={focusedField === 'title'}
				/>
				<SessionLabel label={"Página 1"}></SessionLabel>
				<div className='grid grid-cols-2 gap-4 gap-x-8'>
					<TextAreaInput
						labelText="Descrição"
						id="description"
						name="description"
						required
						value={workValues['description_1']}
						onChange={handleInputChange({ fieldName: 'description_1' })}
						autoFocus={focusedField === 'description_1'}
					/>
					<TextAreaInput
						labelText="Descrição Técnica"
						id="tech_description_1"
						name="tech_description_1"
						required
						value={workValues['tech_description_1']}
						onChange={handleInputChange({ fieldName: 'tech_description_1' })}
						autoFocus={focusedField === 'tech_description_1'}
					/>
				</div>
				<UploadImageSession imageFields={page1ImageFields} />  <RadioFieldsSession RadioFields={radioFieldsPage1} />
				<SessionLabel label={"Página 2"}></SessionLabel>
				<div className='grid grid-cols-2 gap-4 gap-x-8'>

					<TextAreaInput
						labelText="Descrição"
						id="description_2"
						name="description_2"
						required
						value={workValues['description_2']}
						onChange={handleInputChange({ fieldName: 'description_2' })}
						autoFocus={focusedField === 'description_2'}
					/>
					<TextAreaInput
						labelText="Descrição Técnica"
						id="tech_description_2"
						name="tech_description_2"
						required
						value={workValues['tech_description_2']}
						onChange={handleInputChange({ fieldName: 'tech_description_2' })}
						autoFocus={focusedField === 'tech_description_2'}
					/>
				</div>


				<UploadImageSession imageFields={page2ImageFields} />  <RadioFieldsSession RadioFields={radioFieldsPage2} />
				<SessionLabel label={"Opções"}></SessionLabel>

				<OptionsContentPanel />
				{/* 
				<Tabs tabs={tabs} setTab={setTabWork} tab={tabWork} size='lg' variant='lifted' /> */}
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

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			component="a"
			href="#"
			className="w-full my-4 text-blue-800"
			type="submit"
			variant="contained"
			aria-disabled={pending}
		>
			Salvar
		</Button>
	);
}
