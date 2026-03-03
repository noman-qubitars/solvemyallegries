import * as Yup from 'yup';

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024;

export const sessionVideoSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(1, 'Title cannot be empty'),
  description: Yup.string()
    .optional(),
  symptoms: Yup.array()
    .of(Yup.string().min(1, 'Symptom cannot be empty'))
    .optional(),
  videos: Yup.array()
    .of(
      Yup.mixed<File>()
        .test('fileType', 'Only video files are allowed', (value) => {
          if (!value) return true;
          return value.type.startsWith('video/');
        })
        .test('fileSize', 'Video file size must be less than 2GB', (value) => {
          if (!value) return true;
          return value.size <= MAX_FILE_SIZE;
        })
    ),
});

