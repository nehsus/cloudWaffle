import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../layout/PageLayout';
import { Form, Input, Button, Checkbox } from 'antd';
/**
 * Adds a post to cloudflare KV
 * @author Sushen Kumar "su@sushen.dev"
 * @param {*} { location: { pathname } } route path
 * @return {*} Layout for Add a post form
 */
const Adder = ({ location: { pathname } }) => {
  /**
   *
   *
   * @param {String} url CloudFlare Worker URL
   * @param {Object} data Post object
   * @return {Object} Response
   */
  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST', 
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      body: JSON.stringify(data) 
    });
    return response; 
  }

    /**
    * Function to generate a uniqueID for each post
    *
    * @return {number} uniqueID
    */
    const uniqueID = () => {
        return Math.floor(Math.random() * Date.now())
    }
    /**
    * onFinish method for post-add form
    *
    * @param {alert} Status
    */
    const onFinish = (values) => {
        const id =  uniqueID();
        const date = Date.now();
        values.id = id;
        values.published_at = date;
        postData(`https://post_worker.sushenk.workers.dev?id=${id}`, values)
          .then(response => {
          console.log(response); 
          alert("Success! Post added.")
        });
    };
    /**
     * onFinishFailed method for Form
     *
     * @param {*} errorInfo Failure info
     */
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

  return (
    <PageLayout title="Add a post">
      <h3>Add a post below!</h3>
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Username: ' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Title: ' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Content: ' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Add post.
        </Button>
      </Form.Item>
    </Form>
  
    </PageLayout>
  );
};

Adder.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Adder;
