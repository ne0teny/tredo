import React, { createContext, useContext, useReducer, useEffect } from 'react';

const FormContext = createContext();

const STORAGE_KEY = 'creditApplicationForm';

const initialState = {
  currentStep: 1,
  formData: {
    personalInfo: {
      firstName: '',
      lastName: '',
      middleName: '',
      birthDate: '',
      phone: '',
      email: '',
    },
    passportInfo: {
      series: '',
      number: '',
      issuedBy: '',
      issueDate: '',
      birthPlace: '',
    },
    addressInfo: {
      registrationAddress: '',
      actualAddress: '',
      sameAsRegistration: false,
    },
    workInfo: {
      company: '',
      position: '',
      workExperience: '',
      monthlyIncome: '',
      additionalIncome: '',
    },
    creditInfo: {
      amount: '',
      term: '',
      purpose: '',
      hasOtherCredits: false,
      otherCreditsInfo: '',
    },
    agreements: {
      dataProcessing: false,
      creditConditions: false,
      notifications: false,
    },
  },
  completedSteps: [],
  isFormValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.section]: {
            ...state.formData[action.payload.section],
            ...action.payload.data,
          },
        },
      };
    case 'MARK_STEP_COMPLETED':
      return {
        ...state,
        completedSteps: [...new Set([...state.completedSteps, action.payload])],
      };
    case 'SET_FORM_VALIDITY':
      return {
        ...state,
        isFormValid: action.payload,
      };
    case 'RESET_FORM':
      return initialState;
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedData });
      } catch (error) {
        console.error('Error loading form data from storage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateFormData = (section, data) => {
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { section, data },
    });
  };

  const setCurrentStep = (step) => {
    dispatch({
      type: 'SET_CURRENT_STEP',
      payload: step,
    });
  };

  const markStepCompleted = (step) => {
    dispatch({
      type: 'MARK_STEP_COMPLETED',
      payload: step,
    });
  };

  const resetForm = () => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'RESET_FORM' });
  };

  const goToNextStep = () => {
    if (state.currentStep < 6) {
      markStepCompleted(state.currentStep);
      setCurrentStep(state.currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (state.currentStep > 1) {
      setCurrentStep(state.currentStep - 1);
    }
  };

  const value = {
    ...state,
    updateFormData,
    setCurrentStep,
    markStepCompleted,
    resetForm,
    goToNextStep,
    goToPreviousStep,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}; 