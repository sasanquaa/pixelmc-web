import styled from "styled-components";
import { Form, Menu, Table } from "antd";

const borderRadius = 15;

export const FormItemStyled = styled(Form.Item)`
    margin-bottom: 0px;
`;

export const MenuStyled = styled(Menu)`
    border-radius: 5px;

`;

export const TableRounded = styled(Table)`

    .ant-table, .ant-table-container::before, .ant-table-container, .ant-table-header {
        border-top-left-radius: ${borderRadius}px;
        border-top-right-radius: ${borderRadius}px;
    }

    .ant-table-thead > tr > .ant-table-cell:first-child {
        border-top-left-radius: ${borderRadius}px!important;
    } 

    .ant-table-thead > tr > .ant-table-cell:last-child {
        border-top-right-radius: ${borderRadius}px!important;
    } 
`;