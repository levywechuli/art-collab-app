// src/components/CreateArtwork.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function CreateArtwork() {
  return (
    <Formik
      initialValues={{ title: '', description: '', image: null }}
      validationSchema={Yup.object({
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        image: Yup.mixed().required('Required').test(
          'fileType',
          'Unsupported File Format',
          (value) => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
        ),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('image', values.image);

        fetch('/api/artworks', {
          method: 'POST',
          body: formData,
        })
          .then(res => res.json())
          .then(data => {
            console.log('Artwork created:', data);
            resetForm(); // Clear the form after successful submission
          })
          .catch(err => console.error('Error creating artwork:', err))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting, setFieldValue, errors, touched }) => (
        <Form>
          <label htmlFor="title">Title:</label>
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" className="error" />

          <label htmlFor="description">Description:</label>
          <Field as="textarea" name="description" />
          <ErrorMessage name="description" component="div" className="error" />

          <label htmlFor="image">Image:</label>
          <input
            type="file"
            name="image"
            onChange={(event) => {
              setFieldValue('image', event.currentTarget.files[0]);
            }}
          />
          <ErrorMessage name="image" component="div" className="error" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default CreateArtwork;






