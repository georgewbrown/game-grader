import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import { Paper, Grid, Button, CssBaseline, MenuItem } from '@material-ui/core';
import axios from 'axios';


const GameForm = props => {
  const firebaseURL = `https://game-grade.firebaseio.com/games.json`;

  const onSubmit = async values => {
    await axios
      .post(firebaseURL, values)
      .then(res => res.data)
      .catch(error => console.error(error));
      props.toggle(true);
  };
  const validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Required';
    }
    if (!values.esrbRating) {
      errors.esrbRating = 'Required';
    }
    if (!values.playerRating) {
      errors.playerRating = 'Required';
    }
    if (!values.imageURL) {
      errors.imageURL = 'Required';
    }
    if (!values.description) {
      errors.description = 'Required';
    }
    return errors;
  };

return (
  <div style={{ padding: 16, margin: 'auto', maxWidth: 1600 }}>
    <CssBaseline />
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Paper style={{ padding: 16 }}>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  required
                  name="title"
                  component={TextField}
                  type="text"
                  label="Enter Game Title"
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  required
                  fullWidth
                  name="esrbRating"
                  component={Select}
                  label="Select a ESRB Rating"
                  formControlProps={{ fullWidth: true }}
                >
                  <MenuItem value="">Please Select a ESRB Rating</MenuItem>
                  <MenuItem value="E">E - Everyone</MenuItem>
                  <MenuItem value="E10+">E10+ - Everyone 10+</MenuItem>
                  <MenuItem value="T">T - Teen</MenuItem>
                  <MenuItem value="M">M - Mature 17+</MenuItem>
                  <MenuItem value="Ao">Ao - Adults Only 18+</MenuItem>
                  <MenuItem value="RP">RP - Rating Pending</MenuItem>
                </Field>
              </Grid>
              <Grid item xs={6}>
                <Field
                  required
                  fullWidth
                  name="playerRating"
                  component={Select}
                  label="Player Rating"
                  formControlProps={{ fullWidth: true }}
                >
                  <MenuItem value="">Please Select a Player Rating</MenuItem>
                  <MenuItem value="5">5 - ⭐️⭐️⭐️⭐️⭐️</MenuItem>
                  <MenuItem value="4">4 - ⭐️⭐️⭐️⭐️</MenuItem>
                  <MenuItem value="3">3 - ⭐️⭐️⭐️</MenuItem>
                  <MenuItem value="2">2 - ⭐️⭐️</MenuItem>
                  <MenuItem value="1">1 - ⭐️</MenuItem>
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field
                  required
                  fullWidth
                  name="imageURL"
                  component={TextField}
                  multiline
                  label="Please Paste Image URL"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  required
                  fullWidth
                  name="description"
                  component={TextField}
                  multiline
                  label="Description"
                />
              </Grid>
              <Grid item style={{ marginTop: 16 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                  onClick={props.click}
                >
                  {' '}
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      )}
    />
  </div>
);
}

export default GameForm;
