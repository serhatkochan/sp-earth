import React, { useState, useEffect } from 'react';
import { Col } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import mapValues from 'lodash/mapValues';

import Button from 'components/button';
import FilterDropdown from './FilterDropdown';
import FilterText from './FilterText';
import FilterDatepicker from './FilterDatepicker';

import '../index.scss';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';

const TableFilter = ({
  filteredColumns,
  setFilter,
  initialFilter,
  filterMemory = true,
  triggerType = 'button',
}) => {
  const [filters, setFilters] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    if (initialFilter) {
      setFilters(initialFilter);
    }
  }, [initialFilter]);

  const triggerFilterChange = (filter) => {
    if (triggerType !== 'button') {
      setFilter(mapValues(filter, 'id'));
    }
  };

  const getFilters = () =>
    filteredColumns.map((column, index) => {
      const filterItem = column.filter;
      const filterItemKey = filterItem.key ? filterItem.key : column.key;
      const filterItemValue = filters[filterItemKey]
        ? filters[filterItemKey].id
        : null;
      const filterPlaceHolder = filterItem.placeholder
        ? filterItem.placeholder
        : column.title;
      let filterInput;

      switch (filterItem.type) {
        case 'dropdown':
          filterInput = (
            <FilterDropdown
              placeholder={filterPlaceHolder}
              filterProps={column.filter}
              onSelect={(value) =>
                handleChangeInput(value, column.title, filterItemKey)
              }
              value={
                filterItem?.mode === 'multiple' && filterItemValue === null
                  ? []
                  : filterItemValue
              }
              labelRender={filterItem?.render}
              mode={filterItem?.mode}
            />
          );
          break;
        case 'button':
          filterInput = null;
          break;
        case 'datepicker':
          filterInput = (
            <FilterDatepicker
              placeholder={filterPlaceHolder}
              onChange={(query) =>
                handleChangeInput(query.toDate(), column.title, filterItemKey)
              }
              value={filterItemValue}
            />
          );
          break;
        default:
          filterInput = (
            <FilterText
              placeholder={filterPlaceHolder}
              onChange={(query) =>
                handleChangeInput(query, column.title, filterItemKey)
              }
              value={filterItemValue}
            />
          );
      }

      return (
        filterInput && (
          <Col
            key={`${filterItemKey}_filter_item_${index}`}
            span={filterItem.span ? filterItem.span : 3}
            className="filterListItem"
          >
            {filterInput}
          </Col>
        )
      );
    });

  const handleChangeInput = (query, title, key) => {
    const filter = {
      ...filters,
      [key]: {
        id: query,
        title,
      },
    };

    if (query === null) {
      delete filter[key];
    }

    setFilters(filter);
    triggerFilterChange(filter);
  };

  const handleRemoveFilters = () => {
    setFilters({});
    setFilter({});
    triggerFilterChange({});
  };

  return (
    <div className="tableFilter">
      <div
        className={classNames({
          tableFilterItems: true,
          noFilterMemory: !filterMemory,
        })}
      >
        <div className="filterList">{getFilters()}</div>
      </div>
      <div className="tableFilterMemory">
        <ul>
          <li
            onClick={() => {
              setFilter(mapValues(filters, 'id'));
            }}
          >
            <SearchOutlined /> {t('filter')}
          </li>
          <li onClick={() => handleRemoveFilters()}>
            <ClearOutlined /> {t('clear.filter')}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TableFilter;
