'use client';

import {
  ConfigType,
  FieldId,
  PortifolioType,
  ThemeData,
  ThemeProps,
  WorkType,
  imageFieldsTypes,
  imagesIds,
  inputFieldsTypes
} from '../../types';
import { create, editPortfolio } from '@/app/dashboard/portfolios/actions';
import LoadingDots from '@/components/ui/LoadingDots';
import { supabaseClient as supabase } from '@/utils/supabase/client';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
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
import { config } from 'process';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const PORTFOLIO = 'portfolio';
const NEW: string = 'new';
export const revalidate = 60;

const initialState = {
  message: ''
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      component="a"
      href="#"
      className="my-4 w-full text-blue-800"
      type="submit"
      variant="contained"
      aria-disabled={pending}
    >
      Salvar
    </Button>
  );
}

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

  const initialPortfolioState: PortifolioType = {
    id: id,
    title: '',
    work_id: [],
    bio: '',
    contact: '',
    created_at: null,
    cv: '',
    description: '',
    download_count: null,
    image_1: '',
    image_1_src: '',
    image_2: '',
    image_2_src: '',
    page_layout: configData['page_layout'],
    spacing_theme_id: configData['spacing_theme_id'],
    color_theme_id: configData['color_theme_id'],
    typography_theme_id: configData['typography_theme_id'],
    updated_at: null,
    use_profile_info: null,
    user_id: null
  };
  console.log(initialPortfolioState);
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
  const [portfolioValues, setPortfolioValues] = useState<PortifolioType>(
    initialPortfolioState
  );

  useEffect(() => {
    const fetchPortfolioValues = async () => {
      const { data: portfolioDetails } = await supabase
        .from(PORTFOLIO)
        .select('*')
        .match({ id: id })
        .single();
      setPortfolioValues(portfolioDetails as PortifolioType);
    };
    console.log(portfolioValues);
    id !== NEW
      ? fetchPortfolioValues()
      : portfolioValues.spacing_theme_id !== '' && create(portfolioValues);
  }, [id, configData.id, portfolioValues.spacing_theme_id]);

  const handleInputChange =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFocusedField(name);

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
        const updatedPortfolio = {
          ...portfolioAtual,
          [name]: value || '',
          spacing_theme_id: spacing || '',
          color_theme_id: color || '',
          typography_theme_id: typography || ''
        };

        return updatedPortfolio;
      });
    };

  useEffect(() => {
    setPortfolioValues((portfolioAtual) => {
      const { id, created_at, ...initialConfig } = configData;
      console.log(initialConfig);
      const updatedPortfolio = {
        ...portfolioAtual,

        ...initialConfig
      };
      console.log(updatedPortfolio);
      return updatedPortfolio;
    });
  }, [configData.id]);

  /* Edit works 
		
	- Lista completa de trabalhos - gravar no estado works */
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
  };

  const workIsChecked = (id: string) =>
    worksSelecteds ? worksSelecteds.includes(id) : false;

  /** Themes */

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
            portfolioValues[`${tableName}_id` as keyof PortifolioType];
          if (
            selectedTheme ===
            initialPortfolioState[tableName as keyof PortifolioType]
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

  const inputFields: inputFieldsTypes = [
    { label: 'Título', fieldId: 'title', rows: 1 },
    { label: 'Descrição', fieldId: 'description', rows: 3 },
    { label: 'Mini Bio', fieldId: 'bio', rows: 3 },
    { label: 'Curriculum Vitae', fieldId: 'cv', rows: 3 },
    { label: 'Contact', fieldId: 'contact', rows: 3 }
  ];

  const imageFields: imageFieldsTypes = [
    { index: 'image_1', labelButton: 'Upload da Capa' },
    { index: 'image_2', labelButton: 'Upload da contra capa' }
  ];

  return !isLoading && initialPortfolioState.color_theme_id !== '' ? (
    <form action={editForm} id="portfolioForm">
      <input id="id" name="id" hidden defaultValue={id} />
      <input
        type="hidden"
        value={portfolioValues.work_id!}
        name="work_id"
        id="work_id"
      ></input>
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

          {/** Upload de imagens */}
          <Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                gap: 2
              }}
            >
              {imageFields.map(({ index, labelButton }) =>
                imageUpload({ index, labelButton })
              )}
            </Box>
          </Box>

          {/* Works */}
          <Box>{renderWorkCards()}</Box>

          {/* Orientação */}
          {renderPageLayoutSelection()}

          {['color', 'typography', 'spacing'].map((theme, index) =>
            renderThemeSelection({
              label: `Tema de ${
                theme === 'spacing'
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
              handleChange: handleInputChange(`${theme}_theme_id`)
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
    <div className="h-52 flex justify-center items-center w-full">
      <LoadingDots></LoadingDots>
    </div>
  );

  function renderPageLayoutSelection() {
    return (
      <FormControl>
        <FormGroup aria-labelledby="Orientação" sx={{ paddingY: 2 }}>
          <FormLabel id="page_layout_label">Orientação da página</FormLabel>
          <RadioGroup
            row
            aria-labelledby="Orientation"
            defaultValue="portrait"
            name="page_layout"
            id="page_layout"
            value={portfolioValues.page_layout}
            onChange={handleInputChange('page_layout')}
          >
            <FormControlLabel
              value="portrait"
              control={<Radio />}
              label="Retrato"
            />
            <FormControlLabel
              value="landscape"
              control={<Radio />}
              label="Paisagem"
            />
          </RadioGroup>
        </FormGroup>
      </FormControl>
    );
  }

  function renderWorkCards() {
    return (
      <>
        <FormLabel id="works_id">Trabalhos neste portfolio</FormLabel>
        <FormGroup
          aria-labelledby="Works"
          sx={{ display: 'flex', gap: 4, flexDirection: 'row', paddingY: 2 }}
        >
          {works &&
            works.map((work: any) => {
              return workCard(work);
            })}
        </FormGroup>
      </>
    );
  }

  function workCard(work: any): React.JSX.Element {
    return (
      <Card sx={{ display: 'flex' }} key={work.id}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {work.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {work.description}
            </Typography>
            <Checkbox
              checked={workIsChecked(work.id)}
              onChange={() => handleCheckboxChange(work.id)}
              inputProps={{ 'aria-label': 'controlled' }}
              value={work.id}
              required
            />
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={work.image_1_src}
          alt={work.title}
        />
      </Card>
    );
  }

  function imageUpload({
    index,
    labelButton
  }: {
    index: imagesIds;
    labelButton: string;
  }): React.JSX.Element | null {
    const src = portfolioValues[index];

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }} key={index}>
        <Button variant="contained" component="label" className="my-4 w-full">
          {labelButton}

          <input
            type="file"
            hidden
            id={index}
            name={index}
            accept="image/*"
            value={src || ''}
            onChange={() => {
              handleInputChange;
              editForm(objectToFormData({ obj: portfolioValues }));
            }}
          />
        </Button>

        {src && (
          <Image
            className={'rounded-sm'}
            src={src}
            width={250}
            sizes="(max-width: 250px) 100vw, (max-width: 125px) 50vw, 33vw"
            alt={''}
          />
        )}
      </Box>
    );
  }

  function objectToFormData({
    obj
  }: {
    obj: { [s: string]: any } | ArrayLike<unknown>;
  }): FormData {
    const formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }

  function MuiTextField({
    label,
    fieldId,
    rows
  }: {
    label: string;
    fieldId: FieldId;
    rows: number;
  }): React.JSX.Element {
    return (
      <TextField
        label={label}
        variant="outlined"
        type="text"
        id={fieldId}
        name={fieldId}
        key={fieldId}
        required
        value={portfolioValues[fieldId]}
        onChange={handleInputChange(fieldId)}
        autoFocus={focusedField === fieldId}
        multiline={rows > 1}
        rows={rows}
        inputProps={{
          onBlur: () => {
            editForm(objectToFormData({ obj: portfolioValues }));
          }
        }}
      />
    );
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
            value={portfolioValues[fieldName as keyof PortifolioType]}
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
}
