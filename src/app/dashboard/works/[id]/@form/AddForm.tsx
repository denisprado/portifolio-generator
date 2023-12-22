'use client';;
import { createWork, editWork } from '@/app/dashboard/works/actions';
import LoadingDots from '@/components/ui/LoadingDots';
import { supabaseClient as supabase } from '@/utils/supabase/client';
import {
	Box,
	Button,
	Card,
	FormControlLabel,
	FormGroup,
	Radio,
	RadioGroup,
	TextField,
	Typography
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Image from 'next/image';
import {
	ConfigType,
	PortifolioType,
	ThemeData,
	ThemeProps,
	WorkFieldId,
	WorkInputFieldsTypes,
	WorkRadioFieldsTypes,
	WorkType,
	imageFieldsTypes,
	imagesFiles,
	imagesSrcs
} from '../../../types';

import { NEW, WORK } from '@/app/constants';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';


export const revalidate = 60;

const initialState = {
	message: ''
};

export function AddForm({ params: { id } }: { params: { id: string } }) {
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

	const handleInputChange =
		({ fieldName }: { fieldName: keyof WorkType }) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value, files } = e.target;
			console.log(fieldName, value, files && files[0])
			setFocusedField(name);

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
				const updatedWork: WorkType = {
					...workAtual,
					[name]: name.includes('image_') ? (files! ? files[0] : value || '') : value || '',
					spacing_theme_id: spacing || '',
					color_theme_id: color || '',
					typography_theme_id: typography || ''
				};
				setShouldSubmitForm(true);

				return updatedWork;
			});
		};

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

	const ShowImageUploaded = ({ src }: { src: string | null }): React.JSX.Element | null => {
		if (!src) {
			return null
		}
		return (
			<Image
				key={src}
				className={'rounded-sm'}
				src={src}
				width={125}
				height={250}
				alt={''}
			/>
		)
	}

	function imageUpload({
		file,
		src,
		labelButton
	}: {
		file: imagesFiles;
		src: imagesSrcs;
		labelButton: string;
	}): React.JSX.Element | null {

		return (
			<Box sx={{ display: 'flex', flexDirection: 'column' }} key={src}>
				<Button variant="contained" component="label" className="w-full my-4">
					{labelButton}
					<input
						type="file"
						hidden
						id={file}
						name={file}
						accept="image/*"
						onChange={handleInputChange({ fieldName: file })}
					/>
				</Button>
				<ShowImageUploaded src={workValues[src as imagesSrcs]} />
			</Box>
		);
	}

	function RenderPageLayoutSelection(
		{
			label,
			fieldName,
			values
		}: WorkRadioFieldsTypes
	) {
		console.log("🚀 ~ file: AddForm.tsx:321 ~ AddForm ~ values:", values)
		console.log("🚀 ~ file: AddForm.tsx:321 ~ AddForm ~ fieldName:", fieldName)
		console.log("🚀 ~ file: AddForm.tsx:321 ~ AddForm ~ label:", label)

		const [{ value }] = values.filter((value) => value.default)
		console.log("🚀 ~ file: AddForm.tsx:569 ~ AddForm ~ defaultValue:", value)

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
	}

	function objectToFormData(
		{
			obj
		}: {
			obj: { [s: string]: any } | ArrayLike<unknown>;
		}
	): FormData {
		const formData = new FormData();

		Object.entries(obj).forEach(([key, value]) => {
			formData.append(key, value);
		});

		return formData;
	}

	function MuiTextField(
		{
			label,
			fieldId,
			rows
		}: {
			label: string;
			fieldId: WorkFieldId;
			rows: number;
		}
	): React.JSX.Element {
		return (
			<TextField
				label={label}
				variant="outlined"
				type="text"
				id={fieldId}
				name={fieldId}
				key={fieldId}
				required
				value={workValues[fieldId]}
				onChange={handleInputChange({ fieldName: fieldId })}
				autoFocus={focusedField === fieldId}
				multiline={rows > 1}
				rows={rows}
				inputProps={{
					onBlur: () => {
						editForm(objectToFormData({ obj: workValues }));
					}
				}}
			/>
		);
	}

	function RadioSelection({ RadioFields }: { RadioFields: WorkRadioFieldsTypes[] }) {
		return (<div className='grid grid-cols-3'>
			{RadioFields && RadioFields.map(radioField => <div className='col-span-1' key={radioField.fieldName}>
				<RenderPageLayoutSelection fieldName={radioField.fieldName} label={radioField.label} values={radioField.values} />
			</div>)}
		</div>);
	}

	function renderThemeSelection({
		label,
		fieldName,
		themeData,
		handleChange
	}: {
		label: string;
		fieldName: string;
		themeData: ThemeData[];
		handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	}): React.JSX.Element {
		return (
			<FormControl key={fieldName}>
				<FormGroup aria-labelledby={`${fieldName} ID`} sx={{ paddingY: 2 }}>
					<FormLabel id={`${fieldName}_label`}>{label}</FormLabel>
					<RadioGroup
						aria-labelledby={fieldName}
						name={fieldName}
						id={fieldName}
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
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										backgroundColor: 'transparent'
									}}
								>
									<FormControlLabel
										value={theme.id}
										control={<Radio />}
										label={theme.title}
										sx={{ marginLeft: 1 }}
									/>
									{fieldName === 'color_theme_id' && (
										<>
											<Box
												sx={{
													flexDirection: 'row',
													backgroundColor: theme.background_primary_color,
													width: '64px',
													height: '64px',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<Typography sx={{ color: theme.text_primary_color }}>
													{theme.title}
												</Typography>
											</Box>
											<Box
												sx={{
													flexDirection: 'row',
													backgroundColor: theme.background_secondary_color,
													width: '64px',
													height: '64px',
													display: 'flex',
													justifyContent: 'center',
													alignItems: 'center'
												}}
											>
												<Typography sx={{ color: theme.text_secondary_color }}>
													{theme.title}
												</Typography>
											</Box>
										</>
									)}
								</Box>
							</Card>
						))}
					</RadioGroup>
				</FormGroup>
			</FormControl>
		);
	}

	const inputFields: WorkInputFieldsTypes = [
		{ label: 'Título', fieldId: 'title', rows: 1 },
		{ label: 'Descrição', fieldId: 'description_1', rows: 3 },
		{ label: 'Descrição', fieldId: 'description_2', rows: 3 },
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

	const pageLayoutRadioFields: WorkRadioFieldsTypes[] = [
		{ label: 'Orientação da Página', fieldName: `page_layout` as keyof WorkType, values: portraitLandscapValues },
	]

	const generateRadioPageFields = (i: number): WorkRadioFieldsTypes[] => {
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
	// console.log("🚀 ~ file: AddForm.tsx:499 ~ AddForm ~ radioFieldsPage1:", radioFieldsPage1)
	const radioFieldsPage2 = generateRadioPageFields(2)
	// console.log("🚀 ~ file: AddForm.tsx:501 ~ AddForm ~ radioFieldsPage2:", radioFieldsPage2)

	const imageFields: imageFieldsTypes = [
		{ file: 'image_1', src: 'image_1_src', labelButton: 'Imagem Página 1' },
		{ file: 'image_2', src: 'image_2_src', labelButton: 'Imagem Página 2' }
	];

	return !isLoading && initialWorkState.color_theme_id !== '' && id !== NEW ? (
		<form action={editForm} id="workForm">
			<input id="id" name="id" hidden defaultValue={id} />

			<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
				<Box
					sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 4 }}
				>
					{/** Campos de texto*/}
					<Box
						sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', gap: 2 }}
					>
						<Box
							sx={{
								flexGrow: 1,
								display: 'flex',
								flexDirection: 'column',
								gap: 2
							}}
						>
							{inputFields.map(({ label, fieldId, rows }) =>
								MuiTextField({ label, fieldId, rows })
							)}
						</Box>
					</Box>

					<Box>
						<Box
							sx={{
								flexGrow: 1,
								display: 'flex',
								flexDirection: 'row',
								gap: 2
							}}
						>
							{imageFields ? imageFields.map(({ file, src, labelButton }) =>
								imageUpload({ file, src, labelButton })
							) : <p>Sem Imagem</p>}
						</Box>
					</Box>

					<RadioSelection RadioFields={pageLayoutRadioFields}></RadioSelection>
					<RadioSelection RadioFields={radioFieldsPage1}></RadioSelection>
					<RadioSelection RadioFields={radioFieldsPage2}></RadioSelection>

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
				</Box>
			</Box>
			<SubmitButton />
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
