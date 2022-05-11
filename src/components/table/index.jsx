import React, { useEffect, useState } from 'react';
import { Table as AntTable, Tooltip, Modal } from 'antd';
import { useTranslation, Trans } from 'react-i18next';

import TableFilter from './tableFilter';

import './index.scss';
import {
  PlusSquareOutlined,
  CloseSquareOutlined,
  WarningOutlined,
} from '@ant-design/icons';

const { confirm } = Modal;

const Table = ({
  rowKey = 'studentId',
  data,
  columns,
  head,
  filterMemory,
  loading = false,
  rowSelection,
  pagination = false,
  actions,
  rowClassName,
  onFilterChange,
  filterTriggerType = 'button',
  initialFilter,
}) => {
  const { t } = useTranslation();
  const filteredColumns = columns?.filter((item) => item.filter);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
  }, [filter]);

  function showDeleteConfirm(data) {
    confirm({
      title: actions.delete.confirm?.title
        ? actions.delete.confirm.title
        : t('are_you_sure_want_delete'),
      icon: <WarningOutlined />,
      content: actions.delete.confirm?.content.text,
      okText: t('yess'),
      okButtonProps: {
        className: 'button btn-danger small',
      },
      cancelText: t('cancell'),
      cancelButtonProps: {
        className: 'button btn-primary small',
      },
      onOk() {
        actions.delete.onClick(data);
      },
    });
  }

  const getActionsRender = (data) => {
    return (
      actions && (
        <div className="tableActions">
          {actions.edit && (
            <div className="tableActionItem">
              <Tooltip
                title={actions.edit.tooltip ? actions.edit.tooltip : t('edit')}
              >
                <div
                  className="iconWrapper"
                  onClick={() => actions.edit.onClick(data)}
                >
                  <PlusSquareOutlined style={{ fontSize: '24px' }} />
                </div>
              </Tooltip>
            </div>
          )}

          {actions.delete && (
            <div className="tableActionItem">
              <Tooltip
                title={
                  actions.delete.tooltip ? actions.delete.tooltip : t('delete')
                }
              >
                <div
                  className="iconWrapper"
                  onClick={() => {
                    showDeleteConfirm(data);
                  }}
                >
                  <CloseSquareOutlined
                    style={{ fontSize: '24px', color: 'orangered' }}
                  />
                </div>
              </Tooltip>
            </div>
          )}

          {actions.custom && (
            <div className="tableActionItem tableCustomActions">
              {actions.custom(data)}
            </div>
          )}
        </div>
      )
    );
  };

  if (actions) {
    columns.push({
      title: actions.title ? actions.title : '',
      dataIndex: 'tableActions',
      key: 'tableActions',
      render: (_, data) => {
        return getActionsRender(data);
      },
    });
  }

  return (
    <div className="tableWrapper">
      {filteredColumns.length > 0 && (
        <TableFilter
          filterMemory={filterMemory}
          filteredColumns={filteredColumns}
          setFilter={setFilter}
          triggerType={filterTriggerType}
          initialFilter={initialFilter}
        />
      )}
      <hr style={{ backgroundColor: 'red' }} />
      <AntTable
        rowKey={rowKey}
        dataSource={data}
        columns={columns}
        loading={loading}
        rowSelection={rowSelection}
        rowClassName={rowClassName}
        pagination={pagination}
      />
    </div>
  );
};

export default Table;
