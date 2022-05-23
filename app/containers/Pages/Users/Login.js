import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import axios from 'axios';
import qs from 'qs';
import Swal from 'sweetalert2';

function Login(props) {
  const [valueForm, setValueForm] = useState(null);

  const submitForm = values => {
    setTimeout(() => {
      setValueForm(values);
      axios({
        method: 'post',
        url: 'http://192.168.4.55:4000/member',
        data: qs.stringify({
          email: values.email,
          password: values.password
        }),
        headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
      }).then((res) => {
        if (res.data === 'not approve') {
          Swal.fire({
            title: 'แจ้งเตือน',
            text: 'อีเมลนี้ยังไม่ได้รับการอนุมัติจาก Admin',
            icon: 'info',
            confirmButtonText: 'ตกลง',
            timer: 5000
          });
        } else if (res.data === 'no data') {
          Swal.fire({
            title: 'ผิดพลาด',
            text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
            icon: 'error',
            confirmButtonText: 'ตกลง',
            timer: 5000
          });
        } else {
          // window.location.href = '/app';
          window.location.href = '/app?name' + res.data.name;
        }
      }).catch((res) => {
        console.log(res.error);
      });
    }, 1000);
  };

  const title = brand.name + ' - Login';
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
          <LoginForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
