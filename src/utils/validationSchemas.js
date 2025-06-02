import * as yup from 'yup';

// Общие функции валидации
const phoneRegex = /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/;
const passportSeriesRegex = /^\d{2,4}$/;
const passportNumberRegex = /^\d{7,8}$/;

// Схема валидации для личных данных
export const personalInfoSchema = yup.object({
  firstName: yup
    .string()
    .required('Имя обязательно для заполнения')
    .min(2, 'Имя должно содержать минимум 2 символа')
    .matches(/^[а-яёА-ЯЁ\s]+$/, 'Имя должно содержать только русские буквы'),
  lastName: yup
    .string()
    .required('Фамилия обязательна для заполнения')
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .matches(/^[а-яёА-ЯЁ\s]+$/, 'Фамилия должна содержать только русские буквы'),
  middleName: yup
    .string()
    .min(2, 'Отчество должно содержать минимум 2 символа')
    .matches(/^[а-яёА-ЯЁ\s]*$/, 'Отчество должно содержать только русские буквы'),
  birthDate: yup
    .date()
    .required('Дата рождения обязательна для заполнения')
    .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), 'Возраст должен быть не менее 18 лет')
    .min(new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000), 'Возраст не может превышать 100 лет'),
  phone: yup
    .string()
    .required('Телефон обязателен для заполнения')
    .matches(phoneRegex, 'Неверный формат телефона. Используйте: +7 (776) 531 16 00'),
  email: yup
    .string()
    .required('Email обязателен для заполнения')
    .email('Неверный формат email'),
});

// Схема валидации для паспортных данных
export const passportInfoSchema = yup.object({
  series: yup
    .string()
    .required('Серия удостоверения обязательна для заполнения')
    .matches(passportSeriesRegex, 'Серия должна содержать 2-4 цифры'),
  number: yup
    .string()
    .required('Номер удостоверения обязателен для заполнения')
    .matches(passportNumberRegex, 'Номер должен содержать 7-8 цифр'),
  issuedBy: yup
    .string()
    .required('Орган выдачи обязателен для заполнения')
    .min(10, 'Минимум 10 символов'),
  issueDate: yup
    .date()
    .required('Дата выдачи обязательна для заполнения')
    .max(new Date(), 'Дата выдачи не может быть в будущем'),
  birthPlace: yup
    .string()
    .required('Место рождения обязательно для заполнения')
    .min(5, 'Минимум 5 символов'),
});

// Схема валидации для адресной информации
export const addressInfoSchema = yup.object({
  registrationAddress: yup
    .string()
    .required('Адрес регистрации обязателен для заполнения')
    .min(10, 'Минимум 10 символов'),
  actualAddress: yup
    .string()
    .when('sameAsRegistration', {
      is: false,
      then: (schema) => schema.required('Адрес проживания обязателен для заполнения').min(10, 'Минимум 10 символов'),
      otherwise: (schema) => schema.notRequired(),
    }),
  sameAsRegistration: yup.boolean(),
});

// Схема валидации для информации о работе
export const workInfoSchema = yup.object({
  company: yup
    .string()
    .required('Название организации обязательно для заполнения')
    .min(3, 'Минимум 3 символа'),
  position: yup
    .string()
    .required('Должность обязательна для заполнения')
    .min(3, 'Минимум 3 символа'),
  workExperience: yup
    .number()
    .required('Стаж работы обязателен для заполнения')
    .min(0, 'Стаж не может быть отрицательным')
    .max(50, 'Стаж не может превышать 50 лет'),
  monthlyIncome: yup
    .number()
    .required('Ежемесячный доход обязателен для заполнения')
    .min(50000, 'Минимальный доход 50,000 тенге')
    .max(50000000, 'Максимальный доход 50 млн тенге'),
  additionalIncome: yup
    .number()
    .min(0, 'Дополнительный доход не может быть отрицательным')
    .max(50000000, 'Максимальный дополнительный доход 50 млн тенге'),
});

// Схема валидации для параметров кредита
export const creditInfoSchema = yup.object({
  amount: yup
    .number()
    .required('Сумма кредита обязательна для заполнения')
    .min(500000, 'Минимальная сумма кредита 500,000 тенге')
    .max(100000000, 'Максимальная сумма кредита 100,000,000 тенге'),
  term: yup
    .number()
    .required('Срок кредита обязателен для заполнения')
    .min(6, 'Минимальный срок 6 месяцев')
    .max(360, 'Максимальный срок 360 месяцев'),
  purpose: yup
    .string()
    .required('Цель кредита обязательна для заполнения'),
  hasOtherCredits: yup.boolean(),
  otherCreditsInfo: yup
    .string()
    .when('hasOtherCredits', {
      is: true,
      then: (schema) => schema.required('Укажите информацию о других кредитах'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

// Схема валидации для согласий
export const agreementsSchema = yup.object({
  dataProcessing: yup
    .boolean()
    .oneOf([true], 'Согласие на обработку персональных данных обязательно'),
  creditConditions: yup
    .boolean()
    .oneOf([true], 'Согласие с условиями кредитования обязательно'),
  notifications: yup.boolean(),
});

// Общая схема валидации всей формы
export const fullFormSchema = yup.object({
  personalInfo: personalInfoSchema,
  passportInfo: passportInfoSchema,
  addressInfo: addressInfoSchema,
  workInfo: workInfoSchema,
  creditInfo: creditInfoSchema,
  agreements: agreementsSchema,
}); 