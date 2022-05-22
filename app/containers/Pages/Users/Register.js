import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import brand from 'dan-api/dummy/brand';
import { RegisterForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import axios from 'axios';
import qs from 'qs';
import Swal from 'sweetalert2';

function Register(props) {
  const [valueForm, setValueForm] = useState(null);

  const submitForm = values => {
    setTimeout(() => {
      setValueForm(values);
      axios({
        method: 'post',
        url: 'http://192.168.4.55:4000/register',
        data: qs.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          permission: values.permission,
        }),
        headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
      })
        .then((res) => {
          if (res.data === 'insert success') {
            Swal.fire({
              title: 'บันทึกสำเร็จ',
              text: 'สมัครสำเร็จ..รอ Admin อนุมัติ',
              icon: 'success',
              confirmButtonText: 'ตกลง',
            }).then((result) => {
              if (result.value === true) {
                window.location.href = '/login';
              }
            });
          } else {
            Swal.fire({
              title: 'ผิดพลาด',
              text: 'ทำรายการไม่สำเร็จ',
              icon: 'error',
              confirmButtonText: 'ตกลง',
              timer: 4000
            });
          }
        })
        .catch((res) => {
          console.log(res.error);
        });
    }, 1000); // simulate server latency
  };

  const title = brand.name + ' - Register';
  const description = brand.desc;
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <RegisterForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
