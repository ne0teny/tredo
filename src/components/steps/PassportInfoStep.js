import React from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  TextField,
  Typography,
  Grid,
  Alert,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Badge, LocationOn, CalendarToday, Business } from '@mui/icons-material';
import { useForm } from '../../context/FormContext';
import { passportInfoSchema } from '../../utils/validationSchemas';
import AnimatedWrapper from '../AnimatedWrapper';

const PassportInfoStep = () => {
  const { formData, updateFormData } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useReactHookForm({
    resolver: yupResolver(passportInfoSchema),
    defaultValues: formData.passportInfo,
    mode: 'onChange',
  });

  const watchedValues = watch();

  // Автоматически сохраняем данные при изменении
  React.useEffect(() => {
    updateFormData('passportInfo', watchedValues);
  }, [watchedValues, updateFormData]);

  return (
    <AnimatedWrapper>
      <Box>
        <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
          Документы, удостоверяющие личность
        </Typography>
        
        <Alert 
          severity="info" 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            '& .MuiAlert-icon': { fontSize: '1.25rem' },
          }}
        >
          Введите данные вашего удостоверения личности Республики Казахстан. Все поля обязательны для заполнения.
        </Alert>

        <form onSubmit={handleSubmit(() => {})}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('series')}
                fullWidth
                label="Серия удостоверения *"
                placeholder="12"
                inputProps={{ maxLength: 4 }}
                error={!!errors.series}
                helperText={errors.series?.message || 'Первые цифры номера'}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Badge color="action" />
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
            
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('number')}
                fullWidth
                label="Номер удостоверения *"
                placeholder="1234567"
                inputProps={{ maxLength: 8 }}
                error={!!errors.number}
                helperText={errors.number?.message || 'Полный номер удостоверения'}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Badge color="action" />
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
              <TextField
                {...register('issuedBy')}
                fullWidth
                label="Кем выдано *"
                placeholder="МВД Республики Казахстан, Алматинское городское управление полиции"
                error={!!errors.issuedBy}
                helperText={errors.issuedBy?.message || 'Орган, выдавший удостоверение'}
                variant="outlined"
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                      <Business color="action" />
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
            
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('issueDate')}
                fullWidth
                label="Дата выдачи *"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.issueDate}
                helperText={errors.issueDate?.message}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday color="action" />
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
            
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('birthPlace')}
                fullWidth
                label="Место рождения *"
                placeholder="г. Алматы, Республика Казахстан"
                error={!!errors.birthPlace}
                helperText={errors.birthPlace?.message}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
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
              <strong>Требования к документу:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Принимается только действующее удостоверение личности гражданина РК<br/>
              • Документ должен быть в хорошем состоянии, без повреждений<br/>
              • Все данные должны быть четко видны и читаемы
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
                ✓ Все паспортные данные заполнены корректно
              </Alert>
            ) : (
              <Alert 
                severity="warning"
                sx={{ 
                  borderRadius: 2,
                  '& .MuiAlert-icon': { fontSize: '1.25rem' },
                }}
              >
                Пожалуйста, заполните все поля корректно
              </Alert>
            )}
          </Box>
        </form>
      </Box>
    </AnimatedWrapper>
  );
};

export default PassportInfoStep; 