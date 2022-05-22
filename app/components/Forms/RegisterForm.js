import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Brightness5 from '@material-ui/icons/Brightness5';
import People from '@material-ui/icons/People';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import {
  SelectRedux
} from 'dan-components/Forms/ReduxFormMUI';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.password) {
    return 'Passwords dont match';
  }
  return undefined;
};

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function RegisterForm(props) {
  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, value) => {
    setTab(value);
  };
  const trueBool = true;
  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
    deco
  } = props;
  return (
    <Fragment>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Hidden smDown>
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </NavLink>
            <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
              <Icon className={classes.icon}>arrow_forward</Icon>
              เป็นสมาชิกอยู่แล้ว
            </Button>
          </div>
        </Hidden>
        <Typography variant="h4" className={classes.title} gutterBottom>
          สมัครสมาชิก
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          * ขั้นตอนสมัครจะเสร็จสิ้นต้องผ่านการอนุมัติจาก Admin แล้วเท่านั้น
        </Typography>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label="สมัครโดยใช้ Mail เท่านั้น" />
        </Tabs>
        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="name"
                  component={TextFieldRedux}
                  placeholder="Username"
                  label="Username"
                  required
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="email"
                  component={TextFieldRedux}
                  placeholder="Your Email"
                  label="Your Email"
                  required
                  validate={[required, email]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="password"
                  component={TextFieldRedux}
                  type="password"
                  label="Your Password"
                  required
                  validate={[required, passwordsMatch]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="passwordConfirm"
                  component={TextFieldRedux}
                  type="password"
                  label="Re-type Password"
                  required
                  validate={[required, passwordsMatch]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">สิทธิ์การเข้าใช้งาน</InputLabel>
                <Field
                  name="permission"
                  component={SelectRedux}
                  placeholder="selection"
                  autoWidth={trueBool}
                  required
                >
                  <MenuItem value="guest">Guest user</MenuItem>
                  <MenuItem value="super">Super user</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Field>
              </FormControl>
            </div>
            <div className={classes.btnArea}>
              <Button variant="contained" color="primary" type="submit">
                  ถัดไป
                <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    </Fragment>
  );
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const RegisterFormReduxed = reduxForm({
  form: 'registerForm',
  enableReinitialize: true,
})(RegisterForm);

const RegisterFormMapped = connect(
  state => ({
    deco: state.ui.decoration
  }),
)(RegisterFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
