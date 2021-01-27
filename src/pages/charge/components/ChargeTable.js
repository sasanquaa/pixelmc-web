import React from 'react';
import 'antd/dist/antd.less';
import { Table, Tag, Avatar, Tooltip} from 'antd';
import { CompassOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const moment = require('moment');

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export default class ChargeTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                sortOrder: 'descend',
                sortDirections: ['descend'],
                defaultSortOrder: 'descend'
            },
            {
                title: 'Tên in-game',
                dataIndex: 'username',
                sortOrder: false
            },
            {
                title: 'Loại thẻ',
                dataIndex: 'cardType',
                sortOrder: false
            },
            {
                title: 'Mệnh giá',
                dataIndex: 'cardValue',
                render: (v) => `${formatNumber(v.substr(1))} VNĐ`,
                sortOrder: false
            },
            {
                title: 'Số serial',
                dataIndex: 'cardSerial',

                sortOrder: false
            },
            {
                title: 'Trạng thái',
                dataIndex: 'cardStatus',
                render: (s) => {
                    switch(s) {
                        case 'pending':
                            return <Tag color='#e6994c'>Đang xử lý</Tag>;
                        case 'success':
                            return <Tag color='#43e849'>Nạp thành công</Tag>;
                        case 'invalid':
                            return <Tag color='#ed5139'>Sai mệnh giá</Tag>;
                        case 'failure':
                            return <Tag color='#ed5139'>Nạp thất bại</Tag>;
                        case 'error':
                            return <Tag color='#ed5139'>Lỗi hệ thống</Tag>;
                    }
                },
                sortOrder: false
            },
            {
                title: 'Thời gian',
                dataIndex: 'datetime',
                sortOrder: false,
                render: (datetime) => moment(datetime).format('DD-MM-YYYY HH:mm:ss')
            },
            {
                title: 'Code',
                dataIndex: 'youtuber',
                sortOrder: false
            },
        ];
    }

    componentDidMount() {
        fetch('https://pixelmc.vn/api/transactions?_sort=id:desc',{
            method: 'GET'
        }).then(v => {
            v.json().then(data => {
                this.setState({
                    dataSource: data
                });
            });
        });
    }


    render() {
        return (
            <Table
            rowKey={(record) => record.id}
            scroll={{ x:1000, y: 490}}
            columns={this.columns}
            dataSource={this.state.dataSource}
            pagination={false}
            />
        );
        
    }
}