import React from 'react';
import { Card, Col, Row } from 'antd';
import { Button } from "antd";

const Cards = ({showExpenseModal, showIncomeModal,expenses,income,currentBalance}) => {
  return (
    <div className="mt-8 mx-4 sm:mx-8 md:mx-16">
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <div className="shadow-custom rounded-md">
            <Card title={<span style={{ fontWeight: 400 }}>Current Balance</span>} bordered={true}>
              <p className="mt-0 mb-2">&#8377; {currentBalance}</p> 
              <Button  className='bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white' block>
                Reset Balance
              </Button>
            </Card>
          </div>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <div className="shadow-custom rounded-md">
            <Card title={<span style={{ fontWeight: 400 }}>Total Income</span>} bordered={true}>
              <p className="mt-0 mb-2">&#8377; {income}</p> 
              <Button  className='bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white' block onClick={showIncomeModal}>
                Add Income
              </Button>
            </Card>
          </div>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <div className="shadow-custom rounded-md">
            <Card title={<span style={{ fontWeight: 400 }}>Total Expenses</span>} bordered={true}>
              <p className="mt-0 mb-2">&#8377; {expenses}</p> 
              <Button  className='bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white' block onClick={showExpenseModal}>
                Add Expense
              </Button>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
