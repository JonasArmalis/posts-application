import * as yup from 'yup'

export const editPostValidationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .test(
      'not-only-spaces',
      'Title must consist of at least 2 non-space characters',
      (value) => value !== undefined && value.trim().length >= 2
    )
    .max(50, 'Title cannot be more than 50 characters'),
  content: yup
    .string()
    .required('Content is required')
    .min(5, 'Content must be at least 5 characters')
    .test(
      'not-only-spaces',
      'Content must consist of at least 5 non-space characters',
      (value) => value !== undefined && value.trim().length >= 5
    )
    .max(1000, 'Content cannot be more than 1000 characters')
})
