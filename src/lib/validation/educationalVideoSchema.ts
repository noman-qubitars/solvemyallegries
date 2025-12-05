import * as Yup from 'yup';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB in bytes

export const educationalVideoSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(1, 'Title cannot be empty'),
  description: Yup.string()
    .optional(),
  videos: Yup.array()
    // .test('maxFiles', 'At least one video file is required', (value) => {
    //   if (!value || !Array.isArray(value)) return false;
    //   if (value.length === 0) return false;
    //   if (value.length > 1) return false;
    //   return true;
    // })
    .of(
      Yup.mixed<File>()
        .test('fileType', 'Only video files are allowed', (value) => {
          if (!value) return true;
          return value.type.startsWith('video/');
        })
        .test('fileSize', 'Video file size must be less than 500MB', (value) => {
          if (!value) return true;
          return value.size <= MAX_FILE_SIZE;
        })
    ),
});

