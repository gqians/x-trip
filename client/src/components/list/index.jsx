/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import cn from 'classnames';
import pathOr from 'ramda/es/pathOr';
import gql from 'graphql-tag';

import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router';

import Select from '../select';
import Loading from '../loading';
import Pagination from '../pagination';

import s from './style.css';

export function searchStringBuilder (currentSearch = '', fields = {}) {
	return Object.keys(fields).reduce((search, name) => {
		const value = fields[name];
		value === undefined
			? search.delete(name)
			: search.set(name, encodeURIComponent(value));

		return search;
	}, new URLSearchParams(currentSearch));
}

function PageTable ({
	className,
	fieldName,
	fieldsFragment,
	fieldsFragmentName,
	columns,
	pagination,
	location,
	routePrefix,
	history,
	getRefetch
}) {
	const QUERY = gql`
			query(
				$page: Int = 1
				$perPage: Int = 10
				$filter: FilterFindMany${ fieldName }Input
				$sort: SortFindMany${ fieldName }Input = _ID_DESC
			) {
				dataPagination: ${ fieldName }Pagination(
					page: $page
					perPage: $perPage
					filter: $filter
					sort: $sort
				) {
					count
					items {
						...${ fieldsFragmentName }
					}
					pageInfo {
						currentPage
						perPage
						pageCount
						itemCount
						hasNextPage
						hasPreviousPage
					}
				}
			}
			${ fieldsFragment }
		`;

	const variables = Array.from(
		searchStringBuilder(location.search).entries()
	).reduce((obj, [key, val]) => {
		obj[key] = decodeURIComponent(val);
		switch (key) {
		case 'filter':
			obj[key] = JSON.parse(obj[key]);
			break;
		case 'page':
		case 'perPage':
			obj[key] = parseInt(obj[key], 10);
			break;
		}

		return obj;
	}, {});

	const { loading, error, data, refetch } = useQuery(QUERY, { variables });
	getRefetch(refetch);

	if (error) return `Error! ${ error.message }`;

	/**
	 * 当前页数超过最大页数，跳转到最后一页
	 */
	const { currentPage = 0, pageCount, perPage } = pathOr(
		{},
		['dataPagination', 'pageInfo'],
		data
	);
	if (!loading && pageCount > 0 && currentPage > pageCount) {
		this.hanlePageChange(pageCount, perPage);
	}

	const paginationBuilder = data => {
		const search = new URLSearchParams(location.search);
		const {
			perPage = search.get('prePage') || 10,
			currentPage = search.get('currentPage') || 0,
			itemCount = 0
		} = pathOr({}, ['dataPagination', 'pageInfo'], data);

		return {
			current: currentPage,
			showSizeChanger: true,
			showTotal: (total, range) =>
				`${ range[0] }-${ range[1] }, 共 ${ total } 条`,
			pageSize: perPage,
			total: itemCount,
			selectComponentClass: Select,
			...pagination,
			onChange: (page, perPage) => {
				const search = searchStringBuilder(location.search, {
					page,
					perPage
				});
				history.push(`${ routePrefix }?${ search }`);
				if (pagination.onChange) pagination.onChange(page, perPage);
			},
			onShowSizeChange: (page, perPage) => {
				const search = searchStringBuilder(location.search, {
					page,
					perPage
				});
				history.push(`${ routePrefix }?${ search }`);
				if (pagination.onShowSizeChange) {
					pagination.onShowSizeChange(page, perPage);
				}
			}
		};
	};
	if (loading) {
		return <Loading/>;
	}
	return (
		<div className={ cn(className, s.tableContainer) }>
			<div className={ s.tableWrapper }>
				<table className={ s.table }>
					<thead>
						<tr>
							{columns.map(col => (
								<th
									key={ col.key }
									style={ {
										width: col.width || 'auto'
									} }
									className={ cn(
										s.headerItem,
										col.className
									) }
								>
									{col.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{pathOr([], ['dataPagination', 'items'], data).map(
							(row, i) => (
								<tr key={ i }>
									{columns.map(c => {
										const val = row[c.dataIndex];
										return (
											<td
												key={ c.key }
												className={ s.item }
											>
												{c.render
													? c.render(val, row)
													: val}
											</td>
										);
									})}
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
			<Pagination
				{ ...paginationBuilder(data) }
				className={ s.pagination }
			/>
		</div>
	);
}

PageTable.propTypes = {
	className: PropTypes.string,
	routePrefix: PropTypes.string.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
		replace: PropTypes.func.isRequired
	}).isRequired,
	location: PropTypes.shape({
		search: PropTypes.string.isRequired
	}).isRequired,
	pagination: PropTypes.shape({
		showSizeChanger: PropTypes.bool,
		pageSize: PropTypes.number,
		current: PropTypes.number,
		total: PropTypes.number,
		onChange: PropTypes.func,
		onShowSizeChange: PropTypes.func
	}),
	fieldName: PropTypes.string.isRequired,
	fieldsFragment: PropTypes.object.isRequired,
	fieldsFragmentName: PropTypes.string.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			dataIndex: PropTypes.string.isRequired,
			key: PropTypes.string.isRequired,
			render: PropTypes.func
		})
	),
	getRefetch: PropTypes.func
};

PageTable.defaultProps = {
	className: '',
	syncStateToUrl: true,
	pagination: {},
	getRefetch: () => {}
};

export default withRouter(PageTable);
