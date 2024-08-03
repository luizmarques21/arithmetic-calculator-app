import React, { useState, useEffect } from 'react';
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import api from '../../services/api'
import { toast } from 'react-toastify';

const Records = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRecords();
  }, []);

  const getRecords = () => {
    api.get(`/records`).then(response => {
      setRecords(response.records);
    });
  }

  const orderString = (a, b) => {
    a = a === undefined ? '' : a;
    b = b === undefined ? '' : b;
    if (a > b) return 1;
    if (b > a) return -1;
    return 0;
  };

  const formatDateToStringBR = (date) => {
    let currentDate = new Date(date);
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return [day, month, year].join("/");
  };

  let searchInput = ''
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder="Search for..."
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Clear
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      if (record[dataIndex] === undefined) return false;
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
    }
    ,
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          textToHighlight={text ? text.toString() : ''}
          autoEscape
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  };

  const deleteRecord = (recordId) => {
    api.delete(`/record/${recordId}`)
    .then(() => {
      toast.success('Record deleted');
      getRecords();
    }).catch((err) => {
      toast.error(err.response.message);
    });
  };

  let dataSource = [];
  records.forEach((record) => {
    dataSource.push({
      id: record.id,
      username: record.username,
      operation: record.type.replace('_', ' '),
      userBalance: record.user_balance,
      response: record.operation_response,
      date: record.date
    })
  });

  const columns = [
    {
      title: 'ID',
      key: 'id',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => orderString(a.id, b.id),
      sortDirections: ['ascend', 'descend'],
      render: (_, record) => {
        return <p>{record.id}</p>
      }
    },
    {
      title: 'User',
      key: 'username',
      render: (_, record) => {
        return <p>{record.username}</p>
      }
    },
    {
      title: 'Operation',
      key: 'operation',
      ...getColumnSearchProps('operation'),
      sorter: (a, b) => orderString(a.operation, b.operation),
      sortDirections: ['ascend', 'descend'],
      render: (_, record) => {
        return <p className='text-capitalize'>{record.operation}</p>
      }
    },
    {
      title: 'Balance',
      key: 'userBalance',
      render: (_, record) => {
        return <p>{record.userBalance}</p>
      }
    },
    {
      title: 'Response',
      key: 'response',
      render: (_, record) => {
        return <p>{record.response}</p>
      }
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('username'),
      sorter: (a, b) => orderString(a.username, b.userName),
      sortDirections: ['ascend', 'descend'],
      render: (_, record) => {
        return <p>{formatDateToStringBR(record.date)}</p>
      }
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render: (_, record) => {
        return <Button onClick={() => deleteRecord(record.id)} className='btn btn-sm btn-danger'>Delete</Button>
      }
    }
  ];

  return (
    <div className='container'>
      {dataSource.length > 0 ? (
        <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1><strong>No record found</strong></h1>
        </div>
      )}
    </div>
  );
}

export default Records;