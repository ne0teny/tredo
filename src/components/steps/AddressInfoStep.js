import React from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  TextField,
  Typography,
  Grid,
  Alert,
  FormControlLabel,
  Checkbox,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Home, LocationOn } from '@mui/icons-material';
import { useForm } from '../../context/FormContext';
import { addressInfoSchema } from '../../utils/validationSchemas';
import AnimatedWrapper from '../AnimatedWrapper';

const AddressInfoStep = () => {
  const { formData, updateFormData } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useReactHookForm({
    resolver: yupResolver(addressInfoSchema),
    defaultValues: formData.addressInfo,
    mode: 'onChange',
  });

  const watchedValues = watch();
  const sameAsRegistration = watch('sameAsRegistration');

  // Автоматически сохраняем данные при изменении
  React.useEffect(() => {
    updateFormData('addressInfo', watchedValues);
  }, [watchedValues, updateFormData]);

  // Копируем адрес регистрации в адрес проживания
  const handleSameAsRegistrationChange = (event) => {
    const checked = event.target.checked;
    setValue('sameAsRegistration', checked);
    
    if (checked) {
      setValue('actualAddress', watchedValues.registrationAddress);
    } else {
      setValue('actualAddress', '');
    }
  };

  return (
    <AnimatedWrapper>
      <Box>
        <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
          Адресная информация
        </Typography>
        
        <Alert 
          severity="info" 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            '& .MuiAlert-icon': { fontSize: '1.25rem' },
          }}
        >
          Укажите адрес регистрации согласно удостоверению личности и фактический адрес проживания.
        </Alert>

        <form onSubmit={handleSubmit(() => {})}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                {...register('registrationAddress')}
                fullWidth
                label="Адрес регистрации *"
                placeholder="г. Алматы, мкр. Мамыр-7, д. 8, кв. 25"
                multiline
                rows={2}
                error={!!errors.registrationAddress}
                helperText={errors.registrationAddress?.message || 'Адрес согласно удостоверению личности'}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                      <Home color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sameAsRegistration || false}
                    onChange={handleSameAsRegistrationChange}
                    color="primary"
                  />
                }
                label="Адрес проживания совпадает с адресом регистрации"
                sx={{ 
                  '& .MuiFormControlLabel-label': { 
                    fontSize: '0.95rem',
                    fontWeight: 500,
                  } 
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('actualAddress')}
                fullWidth
                label={sameAsRegistration ? 'Адрес проживания' : 'Адрес проживания *'}
                placeholder="г. Алматы, ул. Толе би, д. 85, кв. 12"
                multiline
                rows={2}
                disabled={sameAsRegistration}
                error={!!errors.actualAddress}
                helperText={
                  sameAsRegistration 
                    ? 'Адрес скопирован из адреса регистрации'
                    : errors.actualAddress?.message || 'Фактический адрес проживания'
                }
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                      <LocationOn color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Дополнительная информация */}
          <Paper 
            sx={{ 
              mt: 4, 
              p: 3, 
              bgcolor: 'grey.50', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              <strong>Требования к адресам:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Адрес регистрации должен точно соответствовать удостоверению личности<br/>
              • Адрес проживания — место фактического проживания на данный момент<br/>
              • Укажите полный адрес включая: город, район/микрорайон, улицу, дом, квартиру<br/>
              • При смене адреса в течение года — уведомите банк
            </Typography>
          </Paper>

          {/* Индикатор валидности формы */}
          <Box sx={{ mt: 3 }}>
            {isValid ? (
              <Alert 
                severity="success"
                sx={{ 
                  borderRadius: 2,
                  '& .MuiAlert-icon': { fontSize: '1.25rem' },
                }}
              >
                ✓ Адресная информация заполнена корректно
              </Alert>
            ) : (
              <Alert 
                severity="warning"
                sx={{ 
                  borderRadius: 2,
                  '& .MuiAlert-icon': { fontSize: '1.25rem' },
                }}
              >
                Пожалуйста, заполните все обязательные поля корректно
              </Alert>
            )}
          </Box>
        </form>
      </Box>
    </AnimatedWrapper>
  );
};

export default AddressInfoStep; 